import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { VIEW_CAR, UPDATE_CAR, DELETE_CAR } from '../../constants/carConstants';
import { CAR_LIST_STYLE } from '../../constants/listConstants';

import { serverHost } from '../../config';
const imageUrl = 'http://' + serverHost.ip + ':' + serverHost.port + '/images/';


class CarItem extends Component {
  confirmDelete = (action, id) => {
    confirmAlert({
      title : 'Confirm delete',
      message : 'Are you sure to delete this car from your garage?',
      buttons: [
        {
          label : 'Yes',
          onClick : () => this.handleClick(action, id)
        },
        {
          label : 'No'
        }
      ]
    });
  };

  listStyle(data) {
    return (
      <div className="col-md-12" >
        <h5>
          { data.brand } { data.title } : <small> { data.price } $</small>

          <div className="pull-right">
            <div className="btn-group btn-group-xs">
              <button type="button" className="btn btn-default"
                onClick = { () => this.handleClick(VIEW_CAR, data._id) }
              >
                <span className="glyphicon glyphicon-eye-open"></span>
              </button>
              <button type="button" className="btn btn-success"
                onClick = { () => this.handleClick(UPDATE_CAR, data._id) }
              >
                <span className="glyphicon glyphicon-pencil"></span>
              </button>
              {/*
              <button type="button" className="btn btn-danger"
                onClick = { () => this.handleClick(DELETE_CAR, data._id) }
              >
              */}
              <button type="button" className="btn btn-danger"
                onClick = { () => this.confirmDelete(DELETE_CAR, data._id) }
              >
                <span className="glyphicon glyphicon-trash"></span>
              </button>
            </div>
          </div>

        </h5>
      </div>
    );
  }

  cardStyle(data) {
    const imageName = data.image.length > 0 ? data.image : 'default-img.jpg';
    const imagePath = imageUrl + imageName;
    return (
      <div>
        <div className="col-xs-3 margin-10">
          <img className="img-resize img-rounded"
            alt={ data.brand + data.title }
            src={ `${imagePath}?${Date.now()}` } />

            <center>
              <p> { data.brand } { data.title } :
                <small className="text-muted"> { data.price } $</small>
              </p>
              <div className="btn-group btn-group-xs">
                <button type="button" className="btn btn-default"
                  onClick = { () => this.handleClick(VIEW_CAR, data._id) }
                >
                  <span className="glyphicon glyphicon-eye-open"></span>
                </button>
                <button type="button" className="btn btn-success"
                  onClick = { () => this.handleClick(UPDATE_CAR, data._id) }
                >
                  <span className="glyphicon glyphicon-pencil"></span>
                </button>
                <button type="button" className="btn btn-danger"
                  onClick = { () => this.confirmDelete(DELETE_CAR, data._id) }
                >
                  <span className="glyphicon glyphicon-trash"></span>
                </button>
              </div>
            </center>

        </div>


      </div>
    );
  }

  handleClick(action, id) {
    switch (action) {
      case DELETE_CAR:
        this.props.deleteCar(id);
        break;
      case VIEW_CAR:
        this.props.viewCar(id);
        break;
      case UPDATE_CAR:
        this.props.editCar(id);
        break;
      default:
        console.log(action, id);
    }
  }

  render() {
    const data = this.props.itemData;
    return (
      <div>
        { this.props.carStyle === CAR_LIST_STYLE ?
          this.listStyle(data) : this.cardStyle(data) }
      </div>
    );
  };
}

export default CarItem;
