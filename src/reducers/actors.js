import { INIT_ACTORS, REMOVE_ACTOR, EDIT_ACTOR, CREATE_ACTOR } from '../actions';

const actors = (state = {}, action) => {
	switch (action.type) {
		case INIT_ACTORS:
			const { actors } = action;

			if (!actors) return state;

			return actors.reduce((result, actor) => {
				let { name, gender, age } = actor;
				result = {
					...result,
					[actor.id]: {
						name,
						gender,
						age
					}
				};
				return result;
			}, {});

		case REMOVE_ACTOR:
			const { id } = action;

			return Object.keys(state).reduce((result, key) => {
				if (key !== id) {
					result[key] = state[key];
				}
				return result;
			}, {});

		case EDIT_ACTOR:
			const { actorId, actor } = action;

			return {
				...state,
				[actorId]: actor
			};

		case CREATE_ACTOR:
			return {
				...state,
				[action.id]: action.actor
			};

		default:
			return state;
	}
};

export default actors;
