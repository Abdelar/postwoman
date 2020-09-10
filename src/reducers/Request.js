export const initialRequestState = {
	url: 'jsonplaceholder.typicode.com', // for debugging purposes
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
