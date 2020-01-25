import {combineReducers} from 'redux';
import auth from './auth.reducer'
import layout from './layout.reducer';
import profile from './profile.reducer'
import gigs from './gigs.reducer';
import schedule from './schedule.reducer';
import finance  from './finance.reducer';

export default combineReducers({
    auth,layout, profile, gigs, schedule, finance
})