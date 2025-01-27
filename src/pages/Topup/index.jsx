import React from 'react';
import DashboardLayout from '../../Layout/DashboardLayout';
import ProfileData from '../../components/profileData';
import TopupField from '../../components/topupField';
const Topup = () => {
	return (
		<DashboardLayout>
			<ProfileData />
			<TopupField />
		</DashboardLayout>
	);
};

export default Topup;
