export const initialRequestState = {
	transformRequest: (data, headers) => {
		try {
			const transformedData = JSON.parse(data);
			return transformedData;
		} catch {
			return data;
		}
	},
};

export const requestReducer = (state, action) => {
	switch (action.type) {
		case 'URL_CHANGE':
			return {
				...state,
				url: action.url,
			};
		case 'METHOD_CHANGE':
			return {
				...state,
				method: action.method,
			};
		case 'HEADERS_CHANGE':
			return {
				...state,
				headers: action.headers,
			};
		case 'BODY_CHANGE':
			return {
				...state,
				data: action.body,
			};
		case 'OPTIONS_CHANGE':
			return {
				...state,
				options: action.options,
			};

		default:
			throw new Error('Invalid Response Action');
	}
};
