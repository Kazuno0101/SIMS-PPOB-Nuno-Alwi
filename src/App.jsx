import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Topup from './pages/Topup';
import Transaction from './pages/Transaction';
import TransactionPayment from './pages/Transaction/payment';
import Account from './pages/Account';
import AccountEdit from './pages/Account/edit';
import AuthLayout from './Layout/AuthLayout';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* Route tanpa proteksi */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				{/* Route dengan proteksi */}
				<Route element={<AuthLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/topup" element={<Topup />} />
					<Route path="/transaction" element={<Transaction />} />
					<Route path="/transaction/:type" element={<TransactionPayment />} />
					<Route path="/account" element={<Account />} />
					<Route path="/account/edit" element={<AccountEdit />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
