import { connect } from 'react-redux';

import { deleteCar, carDetails } from '../../actions/carActions';
import CarItem from '../../components/car/CarItemComponent';

const mapDispatchToProps = function(dispatch) {
  return {
    deleteCar : (carId) => dispatch(deleteCar(carId)),
    viewCar : (carId) => dispatch(carDetails(carId, false)),
    editCar : (carId) => dispatch(carDetails(carId, true))
  };
};

export default connect(null, mapDispatchToProps)(CarItem);
