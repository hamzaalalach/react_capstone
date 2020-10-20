import React, { useEffect } from 'react';
import CardElement from './CardElement';
import { Grid } from '@material-ui/core';
import { deleteActor, patchActor } from '../utils/api';
import { removeActor, editActor, setCurrentTab } from '../actions';
import { connect } from 'react-redux';

const ListActors = ({ actors, settings, disSetCurrentTab, ...props }) => {
	const { token } = settings;

	useEffect(
		() => {
			disSetCurrentTab('actors');
		},
		[ disSetCurrentTab ]
	);

	const onDelete = id => {
		deleteActor(token, id).then(deleted => {
			props.disRemoveActor(deleted);
		});
	};

	const onEdit = (id, actor, handleClose) => {
		patchActor(token, id, actor).then(edited => {
			handleClose();
			props.disEditActor({
				id: parseInt(edited),
				actor
			});
		});
	};

	return (
		<Grid container spacing={4}>
			{actors &&
				actors.map(actor => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={actor.id}>
						<CardElement
							type="Actor"
							name={actor.name}
							gender={actor.gender}
							age={actor.age}
							onDelete={onDelete}
							onEdit={onEdit}
							id={actor.id}
						/>
					</Grid>
				))}
		</Grid>
	);
};

function mapStateToProps({ actors, settings }) {
	return {
		actors: Object.keys(actors).map(actor => ({
			id: parseInt(actor),
			...actors[actor]
		})),
		settings
	};
}

function mapDispatchToProps(dispatch) {
	return {
		disRemoveActor: data => dispatch(removeActor(data)),
		disEditActor: data => dispatch(editActor(data)),
		disSetCurrentTab: data => dispatch(setCurrentTab(data))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ListActors);
