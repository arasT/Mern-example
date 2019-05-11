module.exports = (app) => {
  const carController = require('../controllers/carController');

  app.post('/api/cars', carController.addCar);
  app.get('/api/cars', carController.getCars);
  app.get('/api/cars/:id', carController.getSingleCar);
  app.put('/api/cars/:id', carController.updateCar);
  app.delete('/api/cars/:id', carController.deleteCar);
}
