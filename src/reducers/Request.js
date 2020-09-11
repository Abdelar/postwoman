export const initialRequestState = {
	url: 'http://jsonplaceholder.typicode.com/posts/1', // for debugging purposes
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
