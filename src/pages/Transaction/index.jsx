import React from 'react';
import DashboardLayout from '../../Layout/DashboardLayout';
import ProfileData from '../../components/profileData';
import ListTransaction from '../../components/listTransactions';
const Transaction = () => {
	return (
		<DashboardLayout>
			<ProfileData />
			<ListTransaction />
		</DashboardLayout>
	);
};

export default Transaction;
