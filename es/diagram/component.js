
/* eslint-disable no-underscore-dangle */

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import Canvas from '../canvas/component';

export var store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

var Diagram = function Diagram(props) {
  return React.createElement(
    Provider,
    { store: store },
    React.createElement(Canvas, { customEntities: props.customEntities })
  );
};

export default Diagram;