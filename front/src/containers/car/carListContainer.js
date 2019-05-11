import { connect } from 'react-redux';

import CarList from '../../components/car/CarListComponent';
import { addCar } from '../../actions/carActions';

const mapStateToProps = state => {
  return {
    cars : state.carRdc.cars,
    error : state.carRdc.error
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
    addCar : () => dispatch(addCar({ newCar : null, error : null }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarList);
