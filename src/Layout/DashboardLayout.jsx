import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
	return (
		<>
			<div className="flex items-center justify-between p-4 px-40 mb-8 bg-white border border-gray-300 border-bottom-3">
				{/* Logo */}
				<Link to="/" className="flex items-center">
					<img src="/assets/Logo.png" alt="Logo" className="h-8 mr-2" />
					<span className="text-xl font-semibold">SIMS PPOB</span>
				</Link>

				{/* Navigation links */}
				<div className="space-x-16">
					<Link to="/topup" className="font-semibold text-gray-600 hover:text-primary">
						Top Up
					</Link>
					<Link to="/transaction" className="font-semibold text-gray-600 hover:text-primary">
						Transaction
					</Link>
					<Link to="/account" className="font-semibold text-gray-600 hover:text-primary">
						Akun
					</Link>
				</div>
			</div>

			<div>{children}</div>
		</>
	);
};

export default DashboardLayout;
