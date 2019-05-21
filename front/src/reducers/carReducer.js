import { HOME_CAR, ADD_CAR, VIEW_CAR, LIST_CAR, UPDATE_CAR } from '../constants/carConstants';
import { ADD_CAR_ERROR, LIST_CAR_ERROR, VIEW_CAR_ERROR, DELETE_CAR_ERROR } from '../constants/errorConstants';

const initialState = {
  cars : [],
  currentCar : {},
  viewToDisplay : HOME_CAR,
  error : null
};

function carReducer (state = initialState, action) {
  var errorToDisplays = null;
  switch (action.type) {
    case ADD_CAR:
      if (action.payload.error) {
        console.log('Server error : ' + action.payload.error);
        errorToDisplays = ADD_CAR_ERROR;
      }

      // Edit a car
      if (action.payload.currentCar) {
        return { ...state, viewToDisplay : ADD_CAR,
          currentCar : action.payload.currentCar, error : errorToDisplays };
      }
      return { ...state, viewToDisplay : ADD_CAR, currentCar : {}, error : errorToDisplays };
    case VIEW_CAR:
      if (action.payload.error) {
        console.log('Server error : ' + action.payload.error);
        errorToDisplays = VIEW_CAR_ERROR;
      }
      return { ...state,
        viewToDisplay : VIEW_CAR,
        currentCar : action.payload.currentCar, error : errorToDisplays };
    case UPDATE_CAR:
      return { ...state, viewToDisplay : UPDATE_CAR };
    /*
    case DELETE_CAR:
      return { ...state, viewToDisplay : DELETE_CAR };
    */
    case LIST_CAR:
      if (action.payload.error) {
        console.log('Server error : ' + action.payload.error);
        errorToDisplays = LIST_CAR_ERROR;
      }

      if (action.payload.actionError) {
        console.log('Server error : ' + action.payload.actionError);
        errorToDisplays = DELETE_CAR_ERROR;
      }

      return {
        ...state,
        viewToDisplay : LIST_CAR,
        cars : action.payload.cars, error : errorToDisplays };
    case HOME_CAR:
      return { ...state, viewToDisplay : HOME_CAR };
    default:
      return state;
  }
}

export default carReducer;
