import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, makeStyles, Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TheatersIcon from '@material-ui/icons/Theaters';
import { connect } from 'react-redux';
import { createActor, createMovie } from '../actions';
import { postActor, postMovie } from '../utils/api';
import { useAuth0 } from '../react-auth0-spa';
import Can from './auth/Can';

const useStyles = makeStyles(theme => ({
	appBar: {
		top: 'auto',
		bottom: 0
	},
	center: {
		margin: 'auto'
	},
	button: {
		display: 'inline-block',
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4)
	},
	fabButton: {
		position: 'absolute',
		zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: '0 auto'
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	},
	textField: {
		display: 'block',
		marginBottom: theme.spacing(1.5),
		width: '100%'
	},
	closeButton: {
		boxShadow: theme.shadows[1],
		marginLeft: theme.spacing(1)
	}
}));

const Footer = ({ settings, disCreateActor, disCreateMovie }) => {
	const classes = useStyles();
	const { token, currentTab } = settings;
	const [ open, setOpen ] = useState(false);
	const [ titleOrName, setTitleOrName ] = useState('');
	const [ dateOrGender, setDateOrGender ] = useState('');
	const [ age, setAge ] = useState(0);
	const { user } = useAuth0();

	const handleClose = () => {
		setOpen(false);
		setTitleOrName('');
		setDateOrGender('');
		setAge(0);
	};
	const handleOpen = () => {
		if (!currentTab) return;
		setOpen(true);
	};
	const handleChange = (e, func) => {
		func(e.target.value);
	};
	const handleCreate = () => {
		if (currentTab === 'actors') {
			const actor = {
				name: titleOrName,
				age: parseInt(age),
				gender: dateOrGender
			};
			postActor(token, actor).then(created => {
				handleClose();
				disCreateActor({
					id: parseInt(created),
					actor
				});
			});
		} else if (currentTab === 'movies') {
			const movie = {
				title: titleOrName,
				release_date: dateOrGender
			};
			postMovie(token, movie).then(created => {
				handleClose();
				disCreateMovie({
					id: parseInt(created),
					movie
				});
			});
		}
	};

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar>
				<div className={classes.center}>
					<Link to="/movies">
						<Button className={classes.button} color="secondary">
							<TheatersIcon />
							<Typography variant="body1">&nbsp;Movies</Typography>
						</Button>
					</Link>
					<Can
						user={user}
						perform={currentTab === 'actors' ? 'post:actors' : 'post:movies'}
						yes={() => (
							<Fab color="secondary" onClick={handleOpen} aria-label="add" className={classes.fabButton}>
								<AddIcon />
							</Fab>
						)}
					/>
					<Link to="/actors">
						<Button className={classes.button} color="secondary">
							<RecentActorsIcon />
							<Typography variant="body1">&nbsp;Actors</Typography>
						</Button>
					</Link>
				</div>
			</Toolbar>
			<Modal
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}>
				<Fade in={open}>
					<div className={classes.paper}>
						<TextField
							id="standard-basic"
							label={currentTab === 'actors' ? 'Name' : 'Title'}
							value={titleOrName}
							className={classes.textField}
							onChange={e => {
								handleChange(e, setTitleOrName);
							}}
						/>
						<TextField
							id="standard-basic"
							label={currentTab === 'movies' ? 'Release Date' : 'Gender'}
							className={classes.textField}
							value={dateOrGender}
							onChange={e => {
								handleChange(e, setDateOrGender);
							}}
						/>
						{currentTab === 'actors' && (
							<TextField
								id="standard-number"
								label="Age"
								type="number"
								className={classes.textField}
								value={age}
								onChange={e => {
									handleChange(e, setAge);
								}}
							/>
						)}
						<Button variant="contained" color="primary" onClick={handleCreate}>
							Save
						</Button>
						<Button variant="contained" color="secondary" className={classes.closeButton} onClick={handleClose}>
							Close
						</Button>
					</div>
				</Fade>
			</Modal>
		</AppBar>
	);
};

function mapStateToProps({ settings }) {
	return { settings };
}

function mapDispatchToProps(dispatch) {
	return {
		disCreateActor: data => dispatch(createActor(data)),
		disCreateMovie: data => dispatch(createMovie(data))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
