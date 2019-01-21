'use strict';

exports.__esModule = true;
exports.store = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _component = require('../canvas/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = exports.store = (0, _redux.createStore)(_reducer2.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-disable no-underscore-dangle */

var Diagram = function Diagram(props) {
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_component2.default, { customEntities: props.customEntities })
  );
};

exports.default = Diagram;