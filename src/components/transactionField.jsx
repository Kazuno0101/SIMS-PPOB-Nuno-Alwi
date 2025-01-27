import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Banknote } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchProfileAndBalance } from '../features/profileSlice';
import { useParams, useNavigate } from 'react-router-dom';

function TransactionField() {
	const { type } = useParams();
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [amount, setAmount] = useState('');
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const fetchService = async () => {
		try {
			const response = await axios.get('https://take-home-test-api.nutech-integrasi.com/services', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			});
			const service = response.data.data.find((service) => service.service_code === type);

			if (service) {
				setData(service);
				setAmount(formatNumber(service.service_tariff));
			} else {
				toast.error('Layanan tidak ditemukan!', { position: 'top-right' });
				navigate('/');
			}
		} catch (err) {
			toast.error('Gagal memuat data layanan!', { position: 'top-right' });
		}
	};

	useEffect(() => {
		fetchService();
	}, [type]);

	const handleTransaction = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await axios.post(
				'https://take-home-test-api.nutech-integrasi.com/transaction',
				{ service_code: data.service_code },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authToken')}`,
					},
				}
			);

			toast.success(response.data.message || 'Top-up berhasil!', { position: 'top-right' });
			dispatch(fetchProfileAndBalance());
		} catch (err) {
			toast.error(err.response?.data?.message || 'Terjadi kesalahan saat melakukan top-up!', {
				position: 'top-right',
			});
		} finally {
			setLoading(false);
		}
	};
	const formatNumber = (number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: 0,
		}).format(number);
	};

	return (
		<div className="px-40">
			<h2 className="text-lg">Pembayaran</h2>
			<div className="flex items-center mt-2 space-x-2 rounded-lg">
				<img src={data.service_icon} alt={data.service_name} className="w-8 h-8" />
				<p className="font-semibold text-center">{data.service_name}</p>
			</div>
			<div className="flex flex-col w-full gap-4 mt-10">
				<div className="relative">
					<Banknote size={18} className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3" />
					<input
						id="amount"
						name="amount"
						type="text"
						className="w-full pl-10 input input-bordered"
						placeholder="Masukan Nominal Pembayaran"
						value={amount}
						readOnly
					/>
				</div>

				<button type="submit" className={`w-full text-white btn btn-primary`} onClick={handleTransaction}>
					{loading ? 'Memproses...' : 'Bayar'}
				</button>
			</div>

			<ToastContainer />
		</div>
	);
}

export default TransactionField;
