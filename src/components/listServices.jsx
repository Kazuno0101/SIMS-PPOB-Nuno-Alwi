import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListServices() {
	const [services, setServices] = useState([]);
	const [error, setError] = useState(null);

	const fetchServices = async () => {
		try {
			const response = await axios.get('https://take-home-test-api.nutech-integrasi.com/services', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			});
			setServices(response.data.data);
		} catch (error) {
			setError('Error fetching services: ' + error.message);
		}
	};

	useEffect(() => {
		fetchServices();
	}, []);

	return (
		<div className="mb-10">
			<div className="grid grid-cols-2 gap-4 md:grid-cols-8 lg:grid-cols-12">
				{services.map((service) => (
					<Link to={`/transaction/${service.service_code}`} key={service.service_code} className="flex flex-col items-center p-4 rounded-lg">
						<img src={service.service_icon} alt={service.service_name} className="w-16 h-16" />
						<p className="mt-2 text-center">{service.service_name}</p>
					</Link>
				))}
			</div>
		</div>
	);
}

export default ListServices;
