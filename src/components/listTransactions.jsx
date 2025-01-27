import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListTransactions() {
	const [transactions, setTransactions] = useState([]);
	const [offset, setOffset] = useState(0);
	const [limit] = useState(5);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchTransactions = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await axios.get(`https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${offset}&limit=${limit}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			});

			const newRecords = response.data.data.records;
			setTransactions((prev) => [...prev, ...newRecords]);
			setHasMore(newRecords.length === limit);
		} catch (error) {
			setError('Error fetching transactions: ' + error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTransactions();
	}, [offset]);

	const handleShowMore = () => {
		setOffset((prevOffset) => prevOffset + limit);
	};

	const formatNumber = (number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: 0,
		}).format(number);
	};

	function formatDate(dateString) {
		const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

		const date = new Date(dateString);
		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();

		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		return `${day} ${month} ${year} ${hours}:${minutes} WIB`;
	}

	return (
		<div className="px-40 pb-8">
			<h2 className="mb-4 text-xl font-bold">Semua Transaksi</h2>

			{loading ? (
				<p className="text-center">Loading...</p>
			) : error ? (
				<p className="text-center text-red-500">{error}</p>
			) : transactions.length === 0 ? (
				<p className="text-center">No transaction found.</p>
			) : (
				<>
					<div className="space-y-4">
						{transactions.map((transaction, index) => (
							<div
								key={transaction.invoice_number}
								className="flex flex-col items-start justify-between p-4 bg-white border rounded-lg shadow-sm md:flex-row md:items-center"
							>
								<div className="flex flex-col space-y-1">
									<p
										className={`text-xl font-semibold py-1 rounded ${
											transaction.transaction_type ===
											'PAYMENT'
												? 'text-red-500'
												: 'text-green-500'
										}`}
									>
										{`${
											transaction.transaction_type ===
											'PAYMENT'
												? '-'
												: '+'
										}  ${formatNumber(
											transaction.total_amount
										)}`}
									</p>
									<p className="text-sm text-gray-500">
										{formatDate(transaction.created_on)}
									</p>
								</div>
								<div className="flex items-center mt-2 space-x-4 md:mt-0">
									<p className="text-gray-800 text-md">
										{transaction.description}
									</p>
								</div>
							</div>
						))}
					</div>

					{hasMore && !loading && (
						<div className="flex justify-center mt-4">
							<button onClick={handleShowMore} className="text-center bg-white btn text-primary">
								Show More
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default ListTransactions;
