import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, makeStyles, Menu, MenuItem, IconButton } from '@material-ui/core';
import { useAuth0 } from '../react-auth0-spa';
import { connect } from 'react-redux';
import { initActors, initMovies, setToken } from '../actions';
import { getActors, getMovies } from '../utils/api';

const useStyles = makeStyles(theme => ({
	title: {
		flexGrow: 1,
		display: 'flex'
	},
	marginBottomSmall: {
		marginBottom: theme.spacing(3)
	}
}));

const Header = ({ disInitActors, disInitMovies, disSetToken }) => {
	const { isAuthenticated, loginWithRedirect, logout, user, getTokenSilently } = useAuth0();

	useEffect(
		() => {
			getTokenSilently().then(token => {
				disSetToken(token);
				getActors(token).then(actors => {
					disInitActors(actors);
				});
				getMovies(token).then(movies => {
					disInitMovies(movies);
				});
			});
		},
		[ getTokenSilently, disSetToken, disInitActors, disInitMovies ]
	);

	const classes = useStyles();
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleMenu = e => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<AppBar position="static" className={classes.marginBottomSmall}>
			<Toolbar>
				<Typography className={classes.title} variant="h6">
					{isAuthenticated && user.name}
					{!isAuthenticated && 'Please login'}
				</Typography>
				{isAuthenticated && (
					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit">
							<Avatar alt="User Avatar" src={user.picture} />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={open}
							onClose={handleClose}>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={logout}>Logout</MenuItem>
						</Menu>
					</div>
				)}
				{!isAuthenticated && (
					<Button color="inherit" onClick={() => loginWithRedirect({})}>
						Login
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

function mapDispatchToProps(dispatch) {
	return {
		disInitActors: data => dispatch(initActors(data)),
		disInitMovies: data => dispatch(initMovies(data)),
		disSetToken: data => dispatch(setToken(data))
	};
}

export default connect(null, mapDispatchToProps)(Header);
