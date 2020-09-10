import axios from 'axios';
export const Axios = axios.create({
	// baseURL: 'jsonplaceholder.typicode.com/',
	// timeout: 1000,
	// headers: { 'X-Custom-Header': 'foobar' },
});

Axios.interceptors.request.use(
	function (config) {
		console.log('in interceptor');
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
