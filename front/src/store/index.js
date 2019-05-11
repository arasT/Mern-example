import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from '../reducers';

const store = createStore(appReducer, applyMiddleware(thunk));

// store.dispatch(fetchAllCars());

export default store;
