import { CAR_CARD_STYLE, CAR_LIST_STYLE } from '../constants/listConstants';

const initialState = {
  style : CAR_LIST_STYLE
};

function listReducer(state = initialState, action) {
  switch (action.type) {
    case CAR_CARD_STYLE:
      return { ...state, style : CAR_CARD_STYLE };
    case CAR_LIST_STYLE:
      return { ...state, style : CAR_LIST_STYLE };
    default:
      return state;
  }
}

export default listReducer;
