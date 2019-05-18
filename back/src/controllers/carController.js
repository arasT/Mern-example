const fs = require('fs');

const Car = require('../models/car');
const IMAGE_FOLDER = './public/images/';

// Get all cars
exports.getCars = async (req, res) => {

  Car.find()
    .then(cars => { res.send(cars); })
    .catch(err => {
      res.status(500).send({ message : err.message || "Something wrong while retrieving cars." });
    });

}

// Get single car by ID
exports.getSingleCar = async (req, res) => {
  const carId = req.params.id;
  Car.findById(carId)
    .then(car => {
      if (!car) {
        return res.status(404).send({ message : "Car not found with id " + carId });
      }
      res.send(car);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({ message : "Car not found with id " + carId });
      }
      return res.status(500).send({ message : "Something wrong retrieving car with id " + carId });
    });
}

// Add a new car
exports.addCar = async (req, res) => {
  if (!req.body.title) {
    for (var k in req.body) {
      console.log(k, ' ', req.body[k]);
    }
    return res.status(400).send({ message : "Car content cannot be empty" });
  }
  const car = new Car(req.body);
  car.save()
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(500).send({ message: err.message || "Something wrong while creating new car" });
    });
}

// Update an existing car
exports.updateCar = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message : "Car content cannot be empty" });
  }
  const carId = req.params.id;
  const car = req.body;
  const { ...updateData } = car;
  Car.findByIdAndUpdate(carId, updateData, { new : true })
    .then(updateCar => {
      if (!updateCar) {
        return res.status(404).send( { message : "Car not found with id " + carId });
      }
      res.send(updateCar);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({ message : "Car not found with id " + carId });
      }
      // return res.status(500).send({ message : "Something wrong updating car with id " + carId });
      return res.status(500).send({ message : err.message });
    });

}

// Delete a car
exports.deleteCar = async (req, res) => {
  const carId = req.params.id;
  Car.findByIdAndRemove(carId)
    .then(car => {
      if (!car) {
        return res.status(404).send({ message : "Car not found with id " + carId });
      }

      // Delete image car
      const imagePath = IMAGE_FOLDER + car.image;
      if (car.image.length) {
        fs.unlink(imagePath, err => {
          if (err) {
            console.log('Error while deleting image :', imagePath);
          }
        });
      }

      res.send(car);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({ message : "Car not found with id " + carId });
      }
      return res.status(500).send({ message : "Something wrong deleting car with id " + carId });
    });
}


// Add car image
exports.uploadCarImage = async (req, res) => {

  // Multer package upload the image, just return car id
  res.send({ carId : req.params.id });
};

// Delete car image
exports.deleteCarImage = async (req, res) => {
  const imageName = req.params.id + req.params.ext;

  const imagePath = IMAGE_FOLDER + imageName;
  fs.unlink(imagePath, err => {
    if (err) {
      console.log('Error while deleting image :', imagePath);
      console.log('May not exist yet (ex: for update)!');
    }
  });

  res.send({ carId : req.params.id });

}
