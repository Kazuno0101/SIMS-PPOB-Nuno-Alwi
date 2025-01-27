import React, { useState } from 'react';
import { AtSign, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
	const [data, setData] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { id, value } = e.target;
		setData((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await axios.post('https://take-home-test-api.nutech-integrasi.com/login', {
				email: data.email,
				password: data.password,
			});

			const token = response.data.data.token;
			localStorage.setItem('authToken', token);

			toast.success(response.data.message, {
				position: 'top-right',
			});

			setTimeout(() => {
				navigate('/');
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
					<h2 className="px-8 mt-8 mb-16 text-3xl font-semibold text-center">Masuk ke akun Anda</h2>
					<form onSubmit={handleLogin}>
						<div className="my-6">
							<div className="relative">
								<AtSign
									size={18}
									className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3"
								/>
								<input
									id="email"
									type="email"
									value={data.email}
									onChange={handleChange}
									className="w-full pl-10 input input-bordered"
									placeholder="Masukkan email Anda"
									required
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
									type={showPassword ? 'text' : 'password'}
									value={data.password}
									onChange={handleChange}
									className="w-full pl-10 pr-10 input input-bordered"
									placeholder="Masukkan password Anda"
									required
								/>
								<div
									className="absolute text-gray-400 -translate-y-1/2 cursor-pointer top-1/2 right-3"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</div>
							</div>
						</div>

						<button
							type="submit"
							className={`w-full mt-8 mb-4 text-white btn btn-primary ${loading ? 'loading' : ''}`}
							disabled={loading}
						>
							{loading ? 'Loading...' : 'Login'}
						</button>
					</form>
					<div className="mt-4 text-center">
						<p className="text-sm">
							Belum punya akun?{' '}
							<Link to="/register" className="font-bold text-primary">
								Daftar di sini
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

export default Login;
