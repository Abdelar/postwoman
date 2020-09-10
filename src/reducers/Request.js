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
		case 'ELEMENT_CHANGE':
			return {
				...state,
				...action.change,
			};
		default:
			throw new Error('Invalid Response Action');
	}
};
