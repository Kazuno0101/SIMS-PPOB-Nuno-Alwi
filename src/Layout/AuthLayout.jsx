import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
	const isLoggedIn = !!localStorage.getItem('authToken'); // Periksa apakah token ada

	// Jika tidak login, arahkan ke halaman login
	if (!isLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	// Jika sudah login, render semua route yang ada di bawahnya
	return (
		<div>
			{/* Anda dapat menambahkan header, sidebar, atau layout lainnya di sini */}
			<Outlet />
		</div>
	);
};

export default AuthLayout;
