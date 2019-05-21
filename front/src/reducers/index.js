import { combineReducers } from 'redux';

import carReducer from './carReducer';
import listReducer from './listReducer';

const appReducer = combineReducers({
  carRdc : carReducer,
  listRdc : listReducer
});

export default appReducer;
