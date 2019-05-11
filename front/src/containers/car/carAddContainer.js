import { connect } from 'react-redux';

import CarAdd from '../../components/car/CarAddComponent';
import { fetchAllCars, saveCarToDb, updateCarToDb } from '../../actions/carActions';


const mapDispatchToProps = function(dispatch) {
  return {
    returnToList : () => dispatch(fetchAllCars()),
    addCar : (newCar) => dispatch(saveCarToDb(newCar)),
    updateCar : (updatedCarData) => dispatch(updateCarToDb(updatedCarData))
  };
};

const mapStateToProps = state => {
  return {
    carData : state.carRdc.currentCar
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarAdd);
