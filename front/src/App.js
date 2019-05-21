import React, { Component } from 'react';

import CarList from './containers/car/carListContainer';
import AddCar from './containers/car/carAddContainer';
import CarView from './containers/car/carViewContainer';
import { HOME_CAR, ADD_CAR, LIST_CAR, VIEW_CAR } from './constants/carConstants';
import { CAR_CARD_STYLE, CAR_LIST_STYLE } from './constants/listConstants';

class App extends Component {

  handleClick(action) {
    switch (action) {
      case LIST_CAR:
        return this.props.listInitialCars();
      default:
        return this.props.returnToHome();
    }
  }

  handleCarStyle(style) {
    return this.props.toggleStyle(style);
  }

  render() {
    const self = this;
    const viewToDisplay = self.props.viewToDisplay;
    const carStyle = self.props.carStyle;

    return (
      <div>

        <nav className="navbar navbar-default navbar-fixed-top padding-top-10">
          <div className="navbar-inner">
            <div class="container">
            { viewToDisplay !== HOME_CAR &&
              (
                <button type="button" className="btn btn-default"
                  onClick = { () => this.handleClick(HOME_CAR) }
                >
                  <span className="glyphicon glyphicon-home"></span>
                </button>
              )
            }
            { viewToDisplay === LIST_CAR &&
              (
                <div className="pull-right">
                  <div className="btn-group">
                    <button type="button"
                      className={ carStyle === CAR_LIST_STYLE ? "btn btn-default active" : "btn btn-default" }
                      onClick={ () => this.handleCarStyle(CAR_LIST_STYLE) }
                    >
                      <span className="glyphicon glyphicon-th-list"></span>
                    </button>
                    <button type="button"
                      className={ carStyle === CAR_CARD_STYLE ? "btn btn-default active" : "btn btn-default" }
                      onClick={ () => this.handleCarStyle(CAR_CARD_STYLE) }
                    >
                      <span className="glyphicon glyphicon-th-large"></span>
                    </button>
                  </div>
                </div>
              )
            }
            </div>
          </div>
        </nav>

        <hr />

        <div className="container">

          {
            (function(){
              switch (viewToDisplay) {
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
