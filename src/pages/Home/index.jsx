import React from 'react';
import DashboardLayout from '../../Layout/DashboardLayout';
import ProfileData from '../../components/profileData';
import ListServices from '../../components/listServices';
import ListBanner from '../../components/listBanner';
const Home = () => {
	return (
		<DashboardLayout>
			<ProfileData />
			<div className="px-40 ">
				<ListServices />
			</div>
			<ListBanner />
		</DashboardLayout>
	);
};

export default Home;
