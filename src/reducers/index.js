import { combineReducers } from 'redux';
import movies from './movies';
import actors from './actors';
import settings from './settings';

export default combineReducers({
	movies,
	actors,
	settings
});
