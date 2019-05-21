import { connect } from 'react-redux';

import { deleteCar, carDetails } from '../../actions/carActions';
import CarItem from '../../components/car/CarItemComponent';

const matStateToProps = state => {
  return {
    carStyle : state.listRdc.style
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    deleteCar : (carId) => dispatch(deleteCar(carId)),
    viewCar : (carId) => dispatch(carDetails(carId, false)),
    editCar : (carId) => dispatch(carDetails(carId, true))
  };
};

export default connect(matStateToProps, mapDispatchToProps)(CarItem);
