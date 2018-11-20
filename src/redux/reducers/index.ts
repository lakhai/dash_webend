import { combineReducers } from 'redux';
import auth from './auth';
import goals from './goals';
// import modals from './modals';

export default combineReducers({
  auth,
  goals,
  // modals,
} as any);