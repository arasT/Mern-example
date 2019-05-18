const multer = require('multer');

var storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, './public/images');
  },
  filename : (req, file, cb) => {
    //console.log(file);
    const fileExt = file.mimetype.split('/')[1];
    cb(null, req.params.id + '.' + fileExt);
  }
});

const uploadImage = multer({ storage });

module.exports = (app) => {
  const carController = require('../controllers/carController');

  app.post('/api/cars', carController.addCar);
  app.get('/api/cars', carController.getCars);
  app.get('/api/cars/:id', carController.getSingleCar);
  app.put('/api/cars/:id', carController.updateCar);
  app.delete('/api/cars/:id', carController.deleteCar);

  app.post('/api/cars/image/:id', uploadImage.single('carImage'), carController.uploadCarImage);
  app.delete('/api/cars/image/:id/:ext', carController.deleteCarImage);
}
