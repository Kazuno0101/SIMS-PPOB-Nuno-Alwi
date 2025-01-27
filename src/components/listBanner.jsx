import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListBanner() {
	const [banners, setBanners] = useState([]);
	const [error, setError] = useState(null);

	const fetchBanners = async () => {
		try {
			const response = await axios.get('https://take-home-test-api.nutech-integrasi.com/banner', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			});
			setBanners(response.data.data);
		} catch (error) {
			setError('Error fetching banners: ' + error.message);
		}
	};

	useEffect(() => {
		fetchBanners();
	}, []);

	return (
		<div className="pl-40 mb-20">
			<span className="text-xl font-semibold">Temukan Promo Menarik</span>
			<div className="mt-4 overflow-x-scroll ">
				<div className="flex gap-4 min-w-max">
					{banners.map((banner) => (
						<div key={banner.banner_id} className="flex flex-col items-center p-4 rounded-lg">
							<img src={banner.banner_image} alt={banner.banner_title} className="w-full" />
							<p className="mt-2 text-center">{banner.banner_title}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ListBanner;
