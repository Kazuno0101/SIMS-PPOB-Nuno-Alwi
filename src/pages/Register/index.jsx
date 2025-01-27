import React, { useState } from 'react';
import axios from 'axios';
import { AtSign, User, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Register() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [data, setData] = useState({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
	});
	const [loading, setLoading] = useState(false);
	const [passwordMismatch, setPasswordMismatch] = useState(false);

	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		if (name === 'confirmPassword') {
			if (value !== data.password) {
				setPasswordMismatch(true);
			} else {
				setPasswordMismatch(false);
			}
		}
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (data.password.length < 8) {
			toast.error('Password harus terdiri dari minimal 8 karakter!', {
				position: 'top-right',
			});
			setLoading(false);
			return;
		}

		if (data.password !== data.confirmPassword) {
			setPasswordMismatch(true);
			toast.error('Password dan Konfirmasi Password tidak sama!', {
				position: 'top-right',
			});
			setLoading(false);
			return;
		}

		try {
			const response = await axios.post('https://take-home-test-api.nutech-integrasi.com/registration', {
				email: data.email,
				first_name: data.firstName,
				last_name: data.lastName,
				password: data.password,
			});
			toast.success(response.data.message, {
				position: 'top-right',
			});
			setTimeout(() => {
				navigate('/login');
			}, 1000);
		} catch (err) {
			toast.error(err.response.data.message, {
				position: 'top-right',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex h-screen">
			<div className="flex items-center justify-center w-1/2 p-8">
				<div className="w-full max-w-md">
					<div className="flex items-center justify-center mb-8">
						<img src="/assets/Logo.png" alt="Logo" />
						<span className="ml-2 text-2xl font-semibold">SIMS PPOB</span>
					</div>
					<h2 className="px-8 mt-8 mb-16 text-3xl font-semibold text-center">Lengkapi data untuk membuat akun</h2>
					<form onSubmit={handleRegister}>
						<div className="my-6">
							<div className="relative">
								<AtSign
									size={18}
									className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3"
								/>
								<input
									id="email"
									name="email"
									type="email"
									className="w-full pl-10 input input-bordered"
									placeholder="Masukkan email Anda"
									value={data.email}
									onChange={handleInputChange}
								/>
							</div>
						</div>

						<div className="my-6">
							<div className="relative">
								<User
									size={18}
									className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3"
								/>
								<input
									id="firstName"
									name="firstName"
									type="text"
									className="w-full pl-10 input input-bordered"
									placeholder="Nama Depan"
									value={data.firstName}
									onChange={handleInputChange}
								/>
							</div>
						</div>

						<div className="my-6">
							<div className="relative">
								<User
									size={18}
									className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3"
								/>
								<input
									id="lastName"
									name="lastName"
									type="text"
									className="w-full pl-10 input input-bordered"
									placeholder="Nama Belakang"
									value={data.lastName}
									onChange={handleInputChange}
								/>
							</div>
						</div>

						<div className="my-6">
							<div className="relative">
								<LockKeyhole
									size={18}
									className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3"
								/>
								<input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									className="w-full pl-10 pr-10 input input-bordered"
									placeholder="Buat Password"
									value={data.password}
									onChange={handleInputChange}
								/>
								<div
									className="absolute text-gray-400 -translate-y-1/2 cursor-pointer top-1/2 right-3"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</div>
							</div>
						</div>

						<div className="my-6">
							<div className="relative">
								<LockKeyhole
									size={18}
									className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3"
								/>
								<input
									id="confirmPassword"
									name="confirmPassword"
									type={showConfirmPassword ? 'text' : 'password'}
									className={`w-full pl-10 pr-10 input input-bordered ${
										passwordMismatch ? 'border-primary' : ''
									}`}
									placeholder="Konfirmasi Password"
									value={data.confirmPassword}
									onChange={handleInputChange}
								/>
								<div
									className="absolute text-gray-400 -translate-y-1/2 cursor-pointer top-1/2 right-3"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								>
									{showConfirmPassword ? (
										<EyeOff size={18} />
									) : (
										<Eye size={18} />
									)}
								</div>
							</div>
							{passwordMismatch && (
								<div className="mt-2 text-sm text-right text-red-500">Password tidak sama</div>
							)}
						</div>

						<button type="submit" className="w-full mt-8 mb-4 text-white btn btn-primary" disabled={loading}>
							{loading ? 'Mendaftar...' : 'Register'}
						</button>
					</form>
					<div className="mt-4 text-center">
						<p className="text-sm">
							Sudah punya akun? Login{' '}
							<Link to="/login" className="font-bold text-primary">
								di sini
							</Link>
						</p>
					</div>
				</div>
			</div>

			<div className="w-1/2 bg-[#fff1f0] flex justify-center items-center">
				<img src="/assets/Illustrasi Login.png" alt="Login Illustration" className="h-auto max-w-full" />
			</div>

			<ToastContainer />
		</div>
	);
}

export default Register;
