const Car = require('../models/car');

// Get all cars
exports.getCars = (req, res) => {

  Car.find()
    .then(cars => { res.send(cars); })
    .catch(err => {
      res.status(500).send({ message : err.message || "Something wrong while retrieving cars." });
    });

}

// Get single car by ID
exports.getSingleCar = (req, res) => {
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
    console.log('\n' + req.body + '\n');
    return res.status(400).send({ message : "Car content cannot be empty" });
  }
  const car = new Car(req.body);
  car.save()
    .then(data => { res.send(data) })
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
      res.send(car);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({ message : "Car not found with id " + carId });
      }
      return res.status(500).send({ message : "Something wrong deleting car with id " + carId });
    });
}
