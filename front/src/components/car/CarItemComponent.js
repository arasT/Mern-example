import React, { Component } from 'react';

import { VIEW_CAR, UPDATE_CAR, DELETE_CAR } from '../../constants/carConstants';

class CarItem extends Component {
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
      <div className="padding-bottom-10" >
        { data.brand } { data.title }

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
            <button type="button" className="btn btn-danger"
              onClick = { () => this.handleClick(DELETE_CAR, data._id) }
            >
              <span className="glyphicon glyphicon-trash"></span>
            </button>
          </div>
        </div>
      </div>
    );
  };
}

export default CarItem;
