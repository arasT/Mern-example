import { connect } from 'react-redux';

import CarAdd from '../../components/car/CarAddComponent';
import { fetchAllCars, saveCarToDb, updateCarToDb } from '../../actions/carActions';


const mapDispatchToProps = function(dispatch) {
  return {
    returnToList : () => dispatch(fetchAllCars()),
    addCar : (newCar, carImage) => dispatch(saveCarToDb(newCar, carImage)),
    updateCar : (updatedCarData, carImage) => dispatch(updateCarToDb(updatedCarData, carImage))
  };
};

const mapStateToProps = state => {
  return {
    carData : state.carRdc.currentCar
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarAdd);
