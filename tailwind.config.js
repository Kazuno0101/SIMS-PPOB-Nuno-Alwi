module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#f3271c', // Warna primary kustom
				// background: '#ffffff', // Warna latar belakang putih
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#f3271c', // Warna primary diatur di sini
					secondary: '#f6d860', // Anda dapat mengubah warna lain sesuai kebutuhan
					accent: '#37cdbe',
					neutral: '#3d4451',
					'base-100': '#ffffff', // Latar belakang putih
				},
			},
		],
	},
};
