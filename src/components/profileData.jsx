import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileAndBalance } from '../features/profileSlice';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const ProfileData = () => {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile);
	const [showBalance, setShowBalance] = useState(false);

	useEffect(() => {
		dispatch(fetchProfileAndBalance());
	}, [dispatch]);

	const getProfileImage = (profileImage) => {
		const invalidImageURL = 'https://minio.nutech-integrasi.com/take-home-test/null';
		return profileImage === invalidImageURL || !profileImage ? '/assets/Profile Photo.png' : profileImage;
	};

	const formatRupiah = (total) => {
		return total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
	};

	return (
		<div className="flex px-40 mb-10">
			<div className="flex flex-col justify-center w-5/12 ">
				<img src={getProfileImage(profile.profileImage)} alt="Profile" className="w-16 h-16 mb-6 rounded-full" />
				<h2 className="text-lg">Selamat datang,</h2>
				<p className="text-3xl font-semibold">
					{profile.firstName} {profile.lastName}
				</p>
			</div>

			<div className="flex flex-col justify-center w-7/12 p-8 text-white bg-center bg-cover rounded-2xl" style={{ backgroundImage: `url('/assets/Background Saldo.png')` }}>
				<h2 className="mb-4 text-2xl font-bold">Saldo Anda</h2>
				<p className="mb-6 text-4xl font-bold">{showBalance ? formatRupiah(profile.balance) : 'Rp *****'}</p>
				<div className="flex">
					<div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowBalance(!showBalance)}>
						<span className="">{showBalance ? 'Sembunyikan Saldo' : 'Lihat Saldo'}</span>
						{showBalance ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileData;
