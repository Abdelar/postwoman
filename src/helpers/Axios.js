import axios from 'axios';
import moment from 'moment';
import { withElementParsed } from './withElementsParsed';
import uid from 'uid';

export const Axios = axios.create();

Axios.interceptors.request.use(
	function (config) {
		let updatedConfig = withElementParsed({ ...config }, 'headers', 'options');
		updatedConfig.requestID = uid();
		updatedConfig.sendingTime = moment().format('MMMM Do YYYY, h:mm:ss a');
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
