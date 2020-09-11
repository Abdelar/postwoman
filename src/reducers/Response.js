export const initialResponseState = {};
export const responseReducer = (state, action) => {
	switch (action.type) {
		case 'SET_RESPONSE':
			return { ...state, response: action.response, error: null };
		case 'SET_ERROR':
			return {
				...state,
				error: action.error,
				response: null,
				errorMessage: action.errorMessage,
			};
		case 'CLEAR':
			return { errorMessage: action.errorMessage };
		case 'CLEAR_ERROR_MESSAGE':
			return { ...state, errorMessage: null };
		default:
			throw new Error('Invalid Request Action');
	}
};
