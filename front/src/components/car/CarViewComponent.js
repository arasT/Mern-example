import React, { Component } from 'react';
import uuidv1 from 'uuid';
import NotificationSystem from 'react-notification-system';

import '../../App.css';

import { serverHost } from '../../config';
const imageUrl = 'http://' + serverHost.ip + ':' + serverHost.port + '/images/';

class CarView extends Component {

  constructor(props) {
    super(props);
    this.notificationSystem = React.createRef();

    this.car = this.props.car;
  }

  componentDidMount() {
    if (this.props.error) {
      const notification = this.notificationSystem.current;
      notification.addNotification({
        title : 'Error',
        message : this.props.error,
        level : 'error'
      });
    }
  }

  handleReturnClick() {
    this.props.returnToList();
  }

  handleEditClick(carId) {
    this.props.editCar(carId);
  }

  displayServices() {
    if (!Object.keys(this.car.services).length) {
      return (
        <tr>
          <td colSpan="2" className="text-warning">No service yet!</td>
        </tr>
      );
    }

    return (
      Object.keys(this.car.services).map(key => {
        const serviceId = uuidv1();
        return (
          <tr key = { serviceId }>
            <td>{ key }</td><td>{ this.car.services[key] }</td>
          </tr>
        );
      })
    );
  }

  render() {
    const imageName = this.car.image.length > 0 ? this.car.image : 'default-img.jpg';
    const imagePath = imageUrl + imageName;
    return (
      <div className="row">

        <NotificationSystem ref = { this.notificationSystem } />

        <div className="col-md-12">
          <div className="panel panel-primary">

            <div className="panel-heading">
                <span className="glyphicon glyphicon-eye-open"></span>
                <span className="font-20"> Car Details</span>
            </div>

            <div className="panel-body">

              {this.car && (

                <div className="row">

                  <div className="col-md-6">
                    <img className="img-rounded img-resize"
                      alt="Display Car"
                      src={ `${imagePath}?${Date.now()}` }
                    />
                  </div>

                  <div className="col-md-6">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td><strong>Title</strong></td>
                          <td>{ this.car.title }</td>
                        </tr>
                        <tr>
                          <td><strong>Brand</strong></td>
                          <td>{ this.car.brand }</td>
                        </tr>
                        <tr>
                          <td><strong>Price</strong></td>
                          <td>{ this.car.price }</td>
                        </tr>
                        <tr>
                          <td><strong>Age</strong></td>
                          <td>{ this.car.age }</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="font-20">Services</td>
                        </tr>

                        { this.displayServices() }

                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              <div className="row padding-top-10">
                <div className="col-md-12">
                  <button type="button" className="btn btn-default"
                    onClick = { () => this.handleReturnClick() }
                  >
                    <span className="glyphicon glyphicon-backward"> Car List</span>
                  </button>

                  {this.car && (
                    <div className="pull-right">
                      <button type="button" className="btn btn-success"
                        onClick = { () => this.handleEditClick(this.car._id) }
                      >
                        <span className="glyphicon glyphicon-pencil"> Edit </span>
                      </button>
                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    );

  };

}

export default CarView;
