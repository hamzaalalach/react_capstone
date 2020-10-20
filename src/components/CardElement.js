import React, { useState } from 'react';
import { Card, CardContent, makeStyles, Typography, CardActions, Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Can from './auth/Can';
import { useAuth0 } from '../react-auth0-spa';

const useStyles = makeStyles(theme => ({
	root: {
		minWidth: 200,
		width: 200,
		margin: '0 auto'
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	},
	button: {
		width: '50%'
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

const CardElements = props => {
	const classes = useStyles();
	const { type, onDelete, onEdit, id } = props;
	const [ open, setOpen ] = useState(false);
	const [ titleOrName, setTitleOrName ] = useState(type === 'Movie' ? props.title : props.name);
	const [ dateOrGender, setDateOrGender ] = useState(type === 'Movie' ? props.date : props.gender);
	const [ age, setAge ] = useState(props.age);
	const { user } = useAuth0();

	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);
	const handleChange = (e, func) => {
		func(e.target.value);
	};
	const handleUpdate = () => {
		if (type === 'Actor') {
			onEdit(
				id,
				{
					name: titleOrName,
					age: parseInt(age),
					gender: dateOrGender
				},
				handleClose
			);
		} else {
			onEdit(
				id,
				{
					title: titleOrName,
					release_date: dateOrGender
				},
				handleClose
			);
		}
	};

	return (
		<Card variant="outlined" className={classes.root}>
			<CardContent>
				<Typography color="textSecondary" className={classes.title} gutterBottom>
					{type}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{type === 'Movie' ? props.title : props.name}
				</Typography>
				<Typography variant="body2" component="p">
					{type === 'Actor' && props.gender}
				</Typography>
				<Typography variant="body2" component="p">
					{type === 'Movie' ? 'Release Date: ' : 'Age: ' + props.age}
				</Typography>
				<Typography variant="body2" component="p">
					{type === 'Movie' && props.date}
				</Typography>
			</CardContent>
			<CardActions>
				<Can
					user={user}
					perform={type === 'Movie' ? 'delete:movies' : 'delete:actors'}
					yes={() => (
						<Button size="small" color="primary" className={classes.button} onClick={() => onDelete(id)}>
							Delete
						</Button>
					)}
				/>
				<Can
					user={user}
					perform={type === 'Movie' ? 'patch:movies' : 'patch:actors'}
					yes={() => (
						<Button size="small" color="primary" className={classes.button} onClick={handleOpen}>
							Edit
						</Button>
					)}
				/>
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
								label={type === 'Actor' ? 'Name' : 'Title'}
								value={titleOrName}
								className={classes.textField}
								onChange={e => {
									handleChange(e, setTitleOrName);
								}}
							/>
							<TextField
								id="standard-basic"
								label={type === 'Movie' ? 'Release Date' : 'Gender'}
								className={classes.textField}
								value={dateOrGender}
								onChange={e => {
									handleChange(e, setDateOrGender);
								}}
							/>
							{type === 'Actor' && (
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
							<Button variant="contained" color="primary" onClick={handleUpdate}>
								Save
							</Button>
							<Button variant="contained" color="secondary" className={classes.closeButton} onClick={handleClose}>
								Close
							</Button>
						</div>
					</Fade>
				</Modal>
			</CardActions>
		</Card>
	);
};

export default CardElements;
