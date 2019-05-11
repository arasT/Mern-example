import React, { Component } from 'react';
import uuidv1 from 'uuid';

class CarAdd extends Component {
  constructor(props) {
    super(props);
    const { ...carData } = this.props.carData;
    this.isEdit = carData.title ? true : false;
    
    if (this.isEdit) {
      this.state = carData;
      this.state.servicesList = this.populateServices(carData.services);
    }
    else {
      this.state = {
        'title' : '',
        'brand' : '',
        'age' : 0,
        'price' : '',
        'services' : {},
        'servicesList' : []
      };
    }

    // Add error's state
    this.state.carErrors = {
      'title' : '',
      'brand' : '',
      'age' : 0,
      'price' : ''
    };

  }

  populateServices(servicesObj) {
    var servicesList = [];
    for (var serviceName in servicesObj) {
      var tmpService = {};
      tmpService[uuidv1()] = { 'text' : serviceName, 'date' : servicesObj[serviceName] };
      servicesList.push(tmpService);
    }

    return servicesList;
  }

  isEditPanelHeader() {

    // Edit
    if (this.isEdit) {
      return (
        <div className="panel-heading">
          <span className="glyphicon glyphicon-pencil"></span>
          <span className="font-20"> Edit Car </span>
        </div>
      );
    }
    return (
      <div className="panel-heading">
        <span className="glyphicon glyphicon-plus"></span>
        <span className="font-20"> Add Car </span>
      </div>
    );
  }

  handleChange(id, value) {
    const { carErrors } = this.state;
    switch (id) {
      case 'brand':
        carErrors.brand = value.length < 3 ? ' * Must be at least 3 characters!' : '';
        break;
      case 'title':
        carErrors.title = value.length < 2 ? ' * Must be at least 2 characters!' : '';
        break;
      case 'price':
        carErrors.price = isNaN(parseFloat(value)) ? ' * Must be a number or float!' : '';
        break;
      default:
        carErrors.age = isNaN(parseFloat(value)) ? ' * Must be a number!' : '';
    }
    this.setState({ carErrors, [id] : value });
  }

  handleClick() {
    this.props.returnToList();
  }

  handleAddService() {
    const newServiceKey = uuidv1();
    var tmpService = {};
    tmpService[newServiceKey] = {'text' : '', 'date' : ''};
    this.setState({
      ...this.state,
      servicesList : [ ...this.state.servicesList, tmpService ]
    });
  }

  handleRemoveService(serviceKey) {
    this.setState({
      ...this.state,
      servicesList : this.state.servicesList.filter(service => Object.keys(service)[0] !== serviceKey)
    });
  }

  handleServiceChange(type, value, serviceKey) {
    switch(type) {
      case 'text':
        this.setState({
          ...this.state,
          servicesList : this.state.servicesList.map(function(service) {
            if (Object.keys(service)[0] === serviceKey) {
              var tmpService = {};
              tmpService[serviceKey] = { 'text' : value, 'date' : service[serviceKey]['date'] };
              return tmpService;
            } else {
              return service;
            }
          })
        });
      break;
      default:
        this.setState({
          ...this.state,
          servicesList : this.state.servicesList.map(function(service) {
            if (Object.keys(service)[0] === serviceKey) {
              var tmpService = {};
              tmpService[serviceKey] = { 'text' : service[serviceKey]['text'], 'date' : value };
              return tmpService;
            } else {
              return service;
            }
          })
        });
    }

  }

  displayServices() {
    return (
      this.state.servicesList.map(service => {
        const serviceKey = Object.keys(service)[0];
        return (
          <tr key = { serviceKey } >
            <td>
              <input type="text" className="form-control" placeholder="Enter description"
                name = { serviceKey }
                onChange = { (e) => this.handleServiceChange(e.target.type, e.target.value, serviceKey) }
                value = { service[serviceKey]['text'] }
              />
            </td>
            <td>
              <input type="date" className="form-control" placeholder="Enter date"
                name = { serviceKey }
                onChange = { (e) => this.handleServiceChange(e.target.type, e.target.value, serviceKey) }
                value = { service[serviceKey]['date'] }
              />
            </td>
            <td>
              <button type="button" className="btn btn btn-danger"
                onClick = { () => this.handleRemoveService(Object.keys(service)[0]) }
              >
                <span className="glyphicon glyphicon-trash"></span>
              </button>
            </td>
          </tr>
        );
      })
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    var newCar = this.state;
    newCar.age = parseInt(newCar.age);
    newCar.services = this.getServices();

    // Edit / update
    if (this.isEdit) {
      newCar._id = this.props.carData._id;
      newCar.__v = this.props.carData.__v;
      this.props.updateCar(newCar);
      return;
    }

    this.props.addCar(newCar);
  }

  getServices() {
    var allServices = {};
    this.state.servicesList.forEach(service => {
      for (var key in service) {

        // Only add service that have description
        if (service[key]['text'].length > 0 && service[key]['date'].length > 0) {
          allServices[service[key]['text']] = service[key]['date'];
        }
      }
    });
    return allServices;
  }

  render () {
    const cars = this.state;
    return (
      <div className="row">

        <div className="col-md-12">
          <div className="panel panel-primary">

            { this.isEditPanelHeader() }

            <div className="panel-body">
              <form onSubmit = { (e) => this.handleSubmit(e) }>

                <div className="form-group col-md-6">
                  <label htmlFor="brand"> Brand
                    {cars.carErrors.brand.length > 0 &&
                      <small className="text-danger">{ cars.carErrors.brand }</small>
                    }
                  </label>
                  <input type="text" className="form-control" id="brand"
                    placeholder="Enter brand" value = { cars.brand }
                    onChange = { (e) => this.handleChange(e.target.id, e.target.value) }
                  />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="title">Title
                    {cars.carErrors.title.length > 0 &&
                      <small className="text-danger"> { cars.carErrors.title }</small>
                    }
                  </label>
                  <input type="text" className="form-control" id="title"
                    placeholder="Enter title" value = { cars.title }
                    onChange = { (e) => this.handleChange(e.target.id, e.target.value) }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="price">Price
                    {cars.carErrors.price.length > 0 &&
                      <small className="text-danger"> { cars.carErrors.price }</small>
                    }
                  </label>
                  <input type="text" className="form-control" id="price"
                    placeholder="Enter price" value = { cars.price }
                    onChange = { (e) => this.handleChange(e.target.id, e.target.value) }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="age">Age
                    {cars.carErrors.age.length > 0 &&
                      <small className="text-danger"> { cars.carErrors.age }</small>
                    }
                  </label>
                  <input type="number" className="form-control" id="age"
                    value = { cars.age }
                    onChange = { (e) => this.handleChange(e.target.id, e.target.value) }
                  />
                </div>

                <table className="table">
                  <caption className="font-20">Services</caption>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Delete</th>
                    </tr>
                    {
                      this.displayServices()
                    }
                  </thead>
                  <tbody>

                    <tr>
                      <td>
                        <button type="button" className="btn btn-primary"
                          onClick = { () => this.handleAddService() }
                        >
                          <span className="glyphicon glyphicon-plus"></span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <button type="button" className="btn btn-default"
                  onClick = { () => this.handleClick() }
                >
                  Cancel
                </button>
                <div className="pull-right">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </form>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default CarAdd;
