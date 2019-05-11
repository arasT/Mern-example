import { combineReducers } from 'redux';
import carReducer from '../reducers/carReducer';

const appReducer = combineReducers({
  carRdc : carReducer
});

export default appReducer;
