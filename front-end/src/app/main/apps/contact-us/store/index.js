import { combineReducers } from '@reduxjs/toolkit';
import contactUs from './contactUsSlice';

const reducer = combineReducers({
  contactUs,
});

export default reducer;
