import React from 'react';
import DashboardLayout from '../../Layout/DashboardLayout';
import ProfileData from '../../components/profileData';
import TransactionField from '../../components/transactionField';

const TransactionPayment = () => {
	return (
		<DashboardLayout>
			<ProfileData />
			<TransactionField />
		</DashboardLayout>
	);
};

export default TransactionPayment;
