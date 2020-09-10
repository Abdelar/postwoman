import axios from 'axios';
export const Axios = axios.create();

Axios.interceptors.request.use(
	function (config) {
		console.log('in interceptor');
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
