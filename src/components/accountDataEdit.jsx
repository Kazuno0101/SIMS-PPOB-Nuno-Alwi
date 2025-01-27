import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileAndBalance } from '../features/profileSlice';
import { AtSign, User } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AccountData = () => {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile);

	const [loading, setLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState({
		email: '',
		first_name: '',
		last_name: '',
	});

	useEffect(() => {
		dispatch(fetchProfileAndBalance());
	}, [dispatch]);

	useEffect(() => {
		if (!isEditing && profile) {
			setEditData({
				email: profile.email || '',
				first_name: profile.firstName || '',
				last_name: profile.lastName || '',
			});
		}
	}, [isEditing, profile]);

	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setEditData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleEdit = async () => {
		try {
			setLoading(true);
			const response = await axios.put('https://take-home-test-api.nutech-integrasi.com/profile/update', editData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			});
			toast.success(response.data.message || 'Data profil berhasil diperbarui!', { position: 'top-right' });
			dispatch(fetchProfileAndBalance());
			setIsEditing(false);
		} catch (err) {
			toast.error(err.response?.data?.message || 'Gagal memperbarui profil!', { position: 'top-right' });
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
	};

	const handleLogout = () => {
		localStorage.removeItem('authToken');
		toast.info('Anda telah keluar!', { position: 'top-right' });
		setTimeout(() => {
			window.location.href = '/login';
		}, 1000);
	};

	const getProfileImage = (profileImage) => {
		const invalidImageURL = 'https://minio.nutech-integrasi.com/take-home-test/null';
		return profileImage === invalidImageURL || !profileImage ? '/assets/Profile Photo.png' : profileImage;
	};

	return (
		<div className="flex flex-col items-center justify-center px-40 mb-10 ">
			<img src={getProfileImage(profile.profileImage)} alt="Profile" className="w-32 mb-6 rounded-full h-w-32" />
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
							value={editData.email}
							onChange={handleEditChange}
						/>
					</div>
				</div>

				<div className="my-4">
					<label htmlFor="first_name" className="label">
						Nama Depan
					</label>
					<div className="relative">
						<User size={18} className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3" />
						<input
							id="first_name"
							name="first_name"
							type="text"
							className="w-full pl-10 input input-bordered"
							placeholder="Nama Depan"
							value={editData.first_name}
							onChange={handleEditChange}
						/>
					</div>
				</div>

				<div className="my-4">
					<label htmlFor="last_name" className="label">
						Nama Belakang
					</label>
					<div className="relative">
						<User size={18} className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3" />
						<input
							id="last_name"
							name="last_name"
							type="text"
							className="w-full pl-10 input input-bordered"
							placeholder="Nama Belakang"
							value={editData.last_name}
							onChange={handleEditChange}
						/>
					</div>
				</div>

				<button type="button" className="w-full my-4 text-white bg-primary btn btn-primary" onClick={handleEdit} disabled={loading}>
					{loading ? 'Menyimpan...' : 'Simpan'}
				</button>
				<Link to="/account" type="button" className="w-full my-4 bg-white hover:bg-white hover:text-primary btn-primary text-primary btn" onClick={handleCancel}>
					Batalkan
				</Link>
			</div>

			<ToastContainer />
		</div>
	);
};

export default AccountData;
