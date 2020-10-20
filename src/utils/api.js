const api = 'https://casting-cap-api.herokuapp.com';

export const getActors = (token, page = 1) =>
	fetch(`${api}/actors?page=${page}`, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(res => res.json())
		.then(data => data.actors);

export const getMovies = (token, page = 1) =>
	fetch(`${api}/movies?page=${page}`, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(res => res.json())
		.then(data => data.movies);

export const deleteMovie = (token, id) =>
	fetch(`${api}/movies/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(res => res.json())
		.then(data => data.deleted);

export const deleteActor = (token, id) =>
	fetch(`${api}/actors/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(res => res.json())
		.then(data => data.deleted);

export const patchActor = (token, id, body) =>
	fetch(`${api}/actors/${id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
		.then(res => res.json())
		.then(data => data.edited);

export const patchMovie = (token, id, body) =>
	fetch(`${api}/movies/${id}`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
		.then(res => res.json())
		.then(data => data.edited);

export const postActor = (token, body) =>
	fetch(`${api}/actors`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
		.then(res => res.json())
		.then(data => data.created);

export const postMovie = (token, body) =>
	fetch(`${api}/movies`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
		.then(res => res.json())
		.then(data => data.created);
