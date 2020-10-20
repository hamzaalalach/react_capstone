import { SET_TOKEN, SET_CURRENT_TAB } from '../actions';

const initialSettings = {
	token: null,
	currentTab: null
};

const settings = (state = initialSettings, action) => {
	switch (action.type) {
		case SET_TOKEN:
			const { token } = action;

			return {
				...state,
				token
			};

		case SET_CURRENT_TAB:
			const { currentTab } = action;

			return {
				...state,
				currentTab
			};

		default:
			return state;
	}
};

export default settings;
