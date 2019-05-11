import { connect } from 'react-redux';

import CarView from '../../components/car/CarViewComponent';
import { fetchAllCars, carDetails } from '../../actions/carActions';

const mapStateToProps = state => {
  return {
    car : state.carRdc.currentCar,
    error : state.carRdc.error
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    returnToList : () => dispatch(fetchAllCars()),
    editCar : (carId) => dispatch(carDetails(carId, true))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarView);
