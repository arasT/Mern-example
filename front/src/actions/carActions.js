import axios from 'axios';

import { serverHost } from '../config';
import { HOME_CAR, ADD_CAR, VIEW_CAR, LIST_CAR } from '../constants/carConstants';

const burl = 'http://' + serverHost.ip + ':' + serverHost.port;

export function homeCar() {
  return { type : HOME_CAR };
}

export function addCar(payload) {

  // Display view to add Car and error if exist
  if (payload.newCar === null) {
    return { type : ADD_CAR, payload };
  }

  return (dispatch) => { dispatch(fetchAllCars(null)) };
};
export function saveCarToDb(newCar, carImage) {
  return (dispatch) => {
    return axios.post(burl + '/api/cars', newCar)
          .then (res => {
            const newCarFromDb = res.data;
            //dispatch(addCar({ newCar : res.data, error : null }));
            // Display car details instead of cars list (then click return to view list)
            //dispatch(carDetails(res.data._id, false));

            // Upload car image
            if (carImage !== null) {
              const newCar = res.data;
              var imageData = new FormData();
              //imageData.append("carImage", carImage, carImage.name);
              imageData.append('carImage', carImage, newCar._id);
              return axios.post(burl + '/api/cars/image/' + newCar._id, imageData)
                    .then (res => {

                      // Update car image field
                      //console.log(carImage);
                      var updateCar = newCar;
                      const imgExt = carImage.type.split('/')[1];
                      updateCar.image = newCar._id + '.' + imgExt;
                      return axios.put(burl + '/api/cars/' + updateCar._id, updateCar)
                            .then (res => {
                              dispatch(carDetails(res.data._id, false));
                            })
                            .catch (err => {
                              dispatch(viewCar({ currentCar : res.data, error : err }));
                            });
                      })
                      .catch (err => {
                        dispatch(viewCar({ currentCar : newCarFromDb, error : 'Cannot upload image: use default!' }));
                      });
            } else {
              dispatch(carDetails(res.data._id, false));
            }

          })
          .catch (err => {
            dispatch(viewCar({ currentCar : null, error : err }));
          });

  };
};

export function viewCar(payload) {
  return { type : VIEW_CAR, payload };
};
export function carDetails(carId, edit) {
  return (dispatch) => {
    return axios.get(burl + '/api/cars/' + carId)
                .then (res => {

                  // Edit a car instead of view
                  if (edit === true) {
                    dispatch(addCar({ currentCar : res.data, newCar : null, error : null}));
                    return;
                  }

                  dispatch(viewCar({ currentCar : res.data, edit : edit, error : null}));
                })
                .catch ( err => {
                  dispatch(viewCar({ currentCar : null, edit : edit, error : err}));
                });
  };
};

export function listCar(payload) {
  return { type : LIST_CAR, payload };
};
export function fetchAllCars(deleteError) {
  return (dispatch) => {
    return axios.get(burl + '/api/cars')
                .then (res => {
                  if (deleteError) {
                    dispatch(listCar({ cars : res.data, error : null, actionError : deleteError }));
                    return;
                  }
                  dispatch(listCar({ cars : res.data, error : null, actionError : null }));
                })
                .catch (err => {
                  dispatch(listCar({ cars : null, error : err, actionError : null }));
                });
  };
};

/*
export function updateCar(payload) {
  return { type : UPDATE_CAR, payload };
};
*/
export function updateCarToDb(updatedCarData, carImage) {
  return (dispatch) => {
    return axios.put(burl + '/api/cars/' + updatedCarData._id, updatedCarData)
                .then (res => {
                  const updatedCarFromDb = res.data;

                  // Update car image, if new one given by user
                  if (carImage !== null) {

                    // Delete old image
                    const imageExt = '.' + carImage.type.split('/')[1];
                    return axios.delete(burl + '/api/cars/image/' + res.data._id + '/' + imageExt)
                      .then (res => {

                        // Post new image
                        var imageData = new FormData();
                        imageData.append('carImage', carImage, res.data.carId);
                        return axios.post(burl + '/api/cars/image/' + res.data.carId, imageData)
                          .then (res => {

                            // Finaly display car information
                            dispatch(carDetails(res.data.carId, false));
                          })
                          .catch (err => {
                            dispatch(viewCar({ currentCar : updatedCarFromDb, error : 'Error while updating image!' }));
                          });
                      })
                      .catch (err => {
                        dispatch(viewCar({ currentCar : updatedCarFromDb, error : 'Error while deleting old image!' }));
                      });
                  } else {

                    // Else display new car information, with old image
                    dispatch(carDetails(res.data._id, false));
                  }
                })
                .catch (err => {
                  dispatch(viewCar({ currentCar : null, error : err }));
                });
  }
};

export function deleteCar(payload) {
  //return { type : DELETE_CAR, payload };
  return (dispatch) => {
    return axios.delete(burl + '/api/cars/' + payload)
                .then (res => {
                  dispatch(fetchAllCars(null));
                })
                .catch (err => {
                  dispatch(fetchAllCars(err));
                });
  };
};
//export function deleteCarFromDB(){}
