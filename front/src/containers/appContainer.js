import { connect } from 'react-redux';
import App from '../App';
import { fetchAllCars, homeCar } from '../actions/carActions';

const mapStateToProps = state => {
  return {
    viewToDisplay : state.carRdc.viewToDisplay
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    listInitialCars : () => dispatch(fetchAllCars()),
    returnToHome : () => dispatch(homeCar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
