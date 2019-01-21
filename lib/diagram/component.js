'use strict';

exports.__esModule = true;
exports.workflowReducer = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _component = require('../canvas/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
var workflowReducer = exports.workflowReducer = _reducer2.default;
/* eslint-disable no-underscore-dangle */

var Diagram = function Diagram(props) {
  return (
    // <Provider store={store}>
    //   <Canvas customEntities={props.customEntities} />
    // </Provider>
    _react2.default.createElement(_component2.default, { customEntities: props.customEntities })
  );
};

exports.default = Diagram;