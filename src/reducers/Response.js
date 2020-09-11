export const initialResponseState = {};
export const responseReducer = (state, action) => {
	switch (action.type) {
		case 'SET_RESPONSE':
			return { response: action.response };
		case 'SET_ERROR':
			return {
				error: action.error,
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
