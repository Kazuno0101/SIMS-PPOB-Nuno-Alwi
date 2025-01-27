import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileAndBalance } from '../features/profileSlice';
import { AtSign, User } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AccountData = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const profile = useSelector((state) => state.profile);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		dispatch(fetchProfileAndBalance());
	}, [dispatch]);

	const handleProfileImageClick = async (e) => {
		e.preventDefault();
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = 'image/*';

		fileInput.onchange = async () => {
			const file = fileInput.files[0];
			if (file && file.size > 100 * 1024) {
				toast.error('Ukuran gambar maksimum adalah 100 KB!', { position: 'top-right' });
				return;
			}

			const formData = new FormData();
			formData.append('file', file);

			try {
				setLoading(true);
				const response = await axios.put('https://take-home-test-api.nutech-integrasi.com/profile/image', formData, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authToken')}`,
						'Content-Type': 'multipart/form-data',
					},
				});

				toast.success(response.data.message || 'Gambar profil berhasil diperbarui!', { position: 'top-right' });
				dispatch(fetchProfileAndBalance());
			} catch (err) {
				toast.error(err.response?.data?.message || 'Gagal memperbarui gambar profil!', { position: 'top-right' });
			} finally {
				setLoading(false);
			}
		};

		fileInput.click();
	};

	const handleLogout = () => {
		localStorage.removeItem('authToken');
		toast.info('Anda telah keluar!', { position: 'top-right' });
		setTimeout(() => {
			navigate('/');
		}, 2000);
	};

	const getProfileImage = (profileImage) => {
		const invalidImageURL = 'https://minio.nutech-integrasi.com/take-home-test/null';
		return profileImage === invalidImageURL || !profileImage ? '/assets/Profile Photo.png' : profileImage;
	};

	return (
		<div className="flex flex-col items-center justify-center px-40 mb-10 ">
			<img src={getProfileImage(profile.profileImage)} alt="Profile" className="w-32 mb-6 rounded-full cursor-pointer h-w-32" onClick={handleProfileImageClick} />
			<p className="text-3xl font-semibold">
				{profile.firstName} {profile.lastName}
			</p>

			<div className="w-full max-w-xl">
				<div className="my-4">
					<label htmlFor="email" className="label">
						Email
					</label>
					<div className="relative">
						<AtSign size={18} className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3" />
						<input
							id="email"
							name="email"
							type="email"
							className="w-full pl-10 input input-bordered"
							placeholder="Masukkan email Anda"
							value={profile.email}
							readOnly
						/>
					</div>
				</div>

				<div className="my-4">
					<label htmlFor="firstName" className="label">
						Nama Depan
					</label>
					<div className="relative">
						<User size={18} className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3" />
						<input
							id="firstName"
							name="firstName"
							type="text"
							className="w-full pl-10 input input-bordered"
							placeholder="Nama Depan"
							value={profile.firstName}
							readOnly
						/>
					</div>
				</div>

				<div className="my-4">
					<label htmlFor="lastName" className="label">
						Nama Belakang
					</label>
					<div className="relative">
						<User size={18} className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3" />
						<input
							id="lastName"
							name="lastName"
							type="text"
							className="w-full pl-10 input input-bordered"
							placeholder="Nama Belakang"
							value={profile.lastName}
							readOnly
						/>
					</div>
				</div>

				<Link to="/account/edit" type="button" className="w-full my-4 bg-white text-primary btn btn-primary hover:bg-white hover:text-primary">
					Edit Profile
				</Link>
				<button className="w-full my-4 text-white btn btn-primary" onClick={handleLogout}>
					Logout
				</button>
			</div>

			<ToastContainer />
		</div>
	);
};

export default AccountData;
