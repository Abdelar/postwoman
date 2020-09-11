import axios from 'axios';
import moment from 'moment';
import { withElementParsed } from './withElementsParsed';
// import { normalizeUrl } from './normalizeUrl';

export const Axios = axios.create();

Axios.interceptors.request.use(
	function (config) {
		let updatedConfig = withElementParsed(
			{ ...config },
			'headers',
			'data',
			'options'
		);
		updatedConfig.sendingTime = moment().format('MMMM Do YYYY, h:mm:ss a');
		// if (updatedConfig.baseURL) {
		// 	console.log('normalizing base url');
		// 	updatedConfig.baseURL = normalizeUrl(updatedConfig.baseURL);
		// } else {
		// 	updatedConfig.url = normalizeUrl(updatedConfig.url);
		// }
		if (updatedConfig.options) {
			updatedConfig = { ...updatedConfig, ...updatedConfig.options };
			delete updatedConfig.options;
		}
		return updatedConfig;
	},
	function (error) {
		return Promise.reject(error);
	}
);
