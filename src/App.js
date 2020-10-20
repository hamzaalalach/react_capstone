import React from 'react';
import { Router, Switch } from 'react-router-dom';
import Header from './components/Header';
import { useAuth0 } from './react-auth0-spa';
import './App.css';
import { Grid } from '@material-ui/core';
import Footer from './components/Footer';
import ListMovies from './components/ListMovies';
import ListActors from './components/ListActors';
import PrivateRoute from './components/auth/PrivateRoute';
import history from './utils/history';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.primary
	},
	marginBottomSmall: {
		marginBottom: 70
	}
}));

function App() {
	const classes = useStyles();
	const { loading } = useAuth0();

	if (loading) {
		return (
			<Backdrop className={classes.backdrop} open={true}>
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	}
	return (
		<Grid container className="App" direction="column">
			<Router history={history}>
				<Header />
				<Grid item container className={classes.marginBottomSmall}>
					<Grid item xs={false} sm={2} />
					<Grid item xs={12} sm={8}>
						<Switch>
							<PrivateRoute path="/movies" component={ListMovies} />
							<PrivateRoute path="/actors" component={ListActors} />
						</Switch>
					</Grid>
					<Grid item xs={false} sm={2} />
				</Grid>
				<Footer />
			</Router>
		</Grid>
	);
}

export default App;
