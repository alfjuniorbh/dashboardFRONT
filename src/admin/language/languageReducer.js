const INITIAL_STATE = {
	list: []
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
	case 'LIST_LANGUAGE_FETCHED':
		return { ...state,
			list: action.payload.data
		}
	default:
		return state;
	}
}