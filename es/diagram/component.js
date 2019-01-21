
/* eslint-disable no-underscore-dangle */

import React from 'react';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
import reducer from './reducer';
import Canvas from '../canvas/component';

// export const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export var workflowReducer = reducer;

var Diagram = function Diagram(props) {
  return (
    // <Provider store={store}>
    //   <Canvas customEntities={props.customEntities} />
    // </Provider>
    React.createElement(Canvas, { customEntities: props.customEntities })
  );
};

export default Diagram;