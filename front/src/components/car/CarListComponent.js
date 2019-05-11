import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';

import '../../App.css';
import CarItem from '../../containers/car/carItemContainer';

class CarList extends Component {
  constructor(props) {
    super(props);
    this.notificationSystem = React.createRef();
  }

  componentDidMount() {
    this.displayFlashMessage();
  }

  componentDidUpdate() {
    this.displayFlashMessage();
  }

  displayFlashMessage() {
    if (this.props.error) {
      const notification = this.notificationSystem.current;
      notification.addNotification({
        title : 'Error',
        message : this.props.error,
        level : 'error'
      });
    }
  }

  handleClick() {
    this.props.addCar();
  }

  render() {
    const carList = this.props.cars ? this.props.cars.reverse() : [];

    return (
      <div className="row">

        <NotificationSystem ref={ this.notificationSystem } />

        <div className="col-md-12">
          <div className="panel panel-primary">

            <div className="panel-heading">
                <span className="glyphicon glyphicon-list"></span>
                <span className="font-20"> Car Lists</span>
            </div>

            <div className="panel-body">
              <ul className="list-group">
                <li className="list-group-item">

                  {
                    carList.map(car => <CarItem key = { car._id } itemData = { car } />)
                  }

                </li>
              </ul>
            </div>

            <div className="panel-footer">
              <div className="row">
                <div className="col-md-12">
                  <span className="font-20">Total : { this.props.cars ? this.props.cars.length : 0 }</span>
                  <div className="pull-right">
                    <button type="button" className="btn btn-primary"
                      onClick = { () => this.handleClick() }
                    >
                      <span className="glyphicon glyphicon-plus"> Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

}

export default CarList;
