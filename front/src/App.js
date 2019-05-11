import React, { Component } from 'react';

import CarList from './containers/car/carListContainer';
import AddCar from './containers/car/carAddContainer';
import CarView from './containers/car/carViewContainer';
import { HOME_CAR, ADD_CAR, LIST_CAR, VIEW_CAR } from './constants/carConstants';

class App extends Component {

  handleClick(action) {
    switch (action) {
      case LIST_CAR:
        return this.props.listInitialCars();
      default:
        return this.props.returnToHome();
    }
  }

  render() {
    var self = this;
    return (
      <div>

        <nav className="navbar navbar-default" role="navigation">
          <div className="navbar-header container padding-top-10 padding-bottom-10">
            <button type="button" className="btn btn-default"
              onClick = { () => this.handleClick(HOME_CAR) }
            >
              <span className="glyphicon glyphicon-home"></span>
            </button>
          </div>
        </nav>

        <div className="container">

          {
            (function(){
              switch (self.props.viewToDisplay) {
                case LIST_CAR:
                  return (<CarList />);
                case ADD_CAR:
                  return (<AddCar />);
                case VIEW_CAR:
                  return (<CarView />);
                default:
                  return (
                    <div>
                      <div>
                        <h1 className="page-header">Welcome into your garage!</h1>
                        <p>Add, edit, delete and liste all your cars.</p>
                        <center>
                          <button
                            className="btn btn-primary"
                            onClick={ () => self.handleClick(LIST_CAR) }
                          >
                            <strong> Power </strong> <span className="glyphicon glyphicon-off"></span>
                          </button>
                        </center>
                      </div>
                    </div>
                  );
              }
            })()
          }
        </div>

      </div>
    );
  }
}

export default App;
