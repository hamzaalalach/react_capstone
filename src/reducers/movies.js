import { INIT_MOVIES, EDIT_MOVIE, REMOVE_MOVIE, CREATE_MOVIE } from '../actions';

const movies = (state = {}, action) => {
	switch (action.type) {
		case INIT_MOVIES:
			const { movies } = action;

			if (!movies) return state;

			return movies.reduce((result, movie) => {
				let { title, release_date } = movie;
				result = {
					...result,
					[movie.id]: {
						title,
						release_date
					}
				};
				return result;
			}, {});

		case REMOVE_MOVIE:
			const { id } = action;

			return Object.keys(state).reduce((result, key) => {
				if (key !== id) {
					result[id] = state[key];
				}

				return result;
			}, {});

		case EDIT_MOVIE:
			const { movieId, movie } = action;

			return {
				...state,
				[movieId]: movie
			};

		case CREATE_MOVIE:
			return {
				...state,
				[action.id]: action.movie
			};

		default:
			return state;
	}
};

export default movies;
