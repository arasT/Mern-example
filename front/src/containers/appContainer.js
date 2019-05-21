import { connect } from 'react-redux';
import App from '../App';
import { fetchAllCars, homeCar } from '../actions/carActions';
import { carStyle } from '../actions/listActions';

const mapStateToProps = state => {
  return {
    viewToDisplay : state.carRdc.viewToDisplay,
    carStyle : state.listRdc.style
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    listInitialCars : () => dispatch(fetchAllCars()),
    returnToHome : () => dispatch(homeCar()),
    toggleStyle : (style) => dispatch(carStyle(style))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
