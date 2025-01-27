import React, { useState } from 'react';
import axios from 'axios';
import { Banknote } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchProfileAndBalance } from '../features/profileSlice';
function TopupField() {
	const [amount, setAmount] = useState('');
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		const value = e.target.value;

		if (!isNaN(value) && value.length <= 7) {
			setAmount(value);
		}
	};

	const handlePresetClick = (presetAmount) => {
		setAmount(presetAmount);
	};

	const handleTopup = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (!amount || parseInt(amount) < 10000 || parseInt(amount) > 1000000) {
			toast.error('Nominal harus antara 10.000 - 1.000.000!', { position: 'top-right' });
			setLoading(false);
			return;
		}

		try {
			const response = await axios.post(
				'https://take-home-test-api.nutech-integrasi.com/topup',
				{ top_up_amount: parseInt(amount) },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authToken')}`,
					},
				}
			);

			toast.success(response.data.message || 'Top-up berhasil!', { position: 'top-right' });
			setAmount('');
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
			<h2 className="text-lg">Silakan Masukan</h2>
			<p className="text-3xl font-semibold">Nominal Top Up</p>
			<div className="flex gap-8 mt-6">
				{/* Bagian Kiri */}
				<div className="flex flex-col w-2/3 gap-4">
					<div className="relative">
						<Banknote size={18} className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3" />
						<input
							id="amount"
							name="amount"
							type="text"
							className="w-full pl-10 input input-bordered"
							placeholder="Masukan Nominal Top Up"
							value={amount}
							onChange={handleInputChange}
						/>
					</div>

					<button
						type="submit"
						className={`w-full text-white btn btn-primary ${
							!amount || parseInt(amount) < 10000 || parseInt(amount) > 1000000 ? 'btn-disabled' : ''
						}`}
						disabled={!amount || parseInt(amount) < 10000 || parseInt(amount) > 1000000 || loading}
						onClick={handleTopup}
					>
						{loading ? 'Memproses...' : 'Top-Up'}
					</button>
				</div>

				{/* Bagian Kanan */}
				<div className="grid w-1/3 grid-cols-3 gap-4">
					{['10000', '20000', '50000', '100000', '250000', '500000'].map((presetAmount, index) => (
						<button key={index} className="w-full bg-white btn" onClick={() => handlePresetClick(presetAmount)}>
							{formatNumber(presetAmount)}
						</button>
					))}
				</div>
			</div>

			<ToastContainer />
		</div>
	);
}

export default TopupField;
