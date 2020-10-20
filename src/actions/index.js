export const INIT_ACTORS = 'INIT_ACTORS';
export const EDIT_ACTOR = 'EDIT_ACTOR';
export const REMOVE_ACTOR = 'REMOVE_ACTOR';
export const CREATE_ACTOR = 'CREATE_ACTOR';
export const INIT_MOVIES = 'INIT_MOVIES';
export const EDIT_MOVIE = 'EDIT_MOVIE';
export const REMOVE_MOVIE = 'REMOVE_MOVIE';
export const CREATE_MOVIE = 'CREATE_MOVIE';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

export const initActors = actors => ({
	type: INIT_ACTORS,
	actors
});

export const editActor = ({ id, actor }) => ({
	type: EDIT_ACTOR,
	actorId: id,
	actor
});

export const removeActor = id => ({
	type: REMOVE_ACTOR,
	id
});

export const createActor = ({ id, actor }) => ({
	type: CREATE_ACTOR,
	id,
	actor
});

export const initMovies = movies => ({
	type: INIT_MOVIES,
	movies
});

export const editMovie = ({ id, movie }) => ({
	type: EDIT_MOVIE,
	movieId: id,
	movie
});

export const removeMovie = id => ({
	type: REMOVE_MOVIE,
	id
});

export const createMovie = ({ movie, id }) => ({
	type: CREATE_MOVIE,
	id,
	movie
});

export const setToken = token => ({
	type: SET_TOKEN,
	token
});

export const setCurrentTab = currentTab => ({
	type: SET_CURRENT_TAB,
	currentTab
});
