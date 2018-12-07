import { combineReducers } from 'redux';
import auth from './auth';
import goals from './goals';
import quests from './quests';
import journal from './journal';
import feeds from './feeds';
// import modals from './modals';

export default combineReducers({
  auth,
  goals,
  quests,
  journal,
  feeds,
  // modals,
} as any);