import React, { useEffect } from 'react';
import CardElement from './CardElement';
import { Grid } from '@material-ui/core';
import { deleteMovie, patchMovie } from '../utils/api';
import { removeMovie, editMovie, setCurrentTab } from '../actions';
import { connect } from 'react-redux';

const ListMovies = ({ movies, settings, disSetCurrentTab, ...props }) => {
	const { token } = settings;

	useEffect(
		() => {
			disSetCurrentTab('movies');
		},
		[ disSetCurrentTab ]
	);

	const onDelete = id => {
		deleteMovie(token, id).then(deleted => {
			props.disRemoveMovie(deleted);
		});
	};

	const onEdit = (id, movie, handleClose) => {
		patchMovie(token, id, movie).then(edited => {
			handleClose();
			props.disEditMovie({
				id: parseInt(edited),
				movie
			});
		});
	};

	return (
		<Grid container spacing={4}>
			{movies &&
				movies.map(movie => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
						<CardElement
							type="Movie"
							title={movie.title}
							date={movie.release_date}
							onDelete={onDelete}
							onEdit={onEdit}
							id={movie.id}
						/>
					</Grid>
				))}
		</Grid>
	);
};

function mapStateToProps({ movies, settings }) {
	return {
		movies: Object.keys(movies).map(movie => ({
			id: parseInt(movie),
			...movies[movie]
		})),
		settings
	};
}

function mapDispatchToProps(dispatch) {
	return {
		disRemoveMovie: data => dispatch(removeMovie(data)),
		disEditMovie: data => dispatch(editMovie(data)),
		disSetCurrentTab: data => dispatch(setCurrentTab(data))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMovies);
