'use strict';

exports.__esModule = true;

var _reducer = require('../entity/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _reducer3 = require('../canvas/reducer');

var _reducer4 = _interopRequireDefault(_reducer3);

var _reducer5 = require('../config/reducer');

var _reducer6 = _interopRequireDefault(_reducer5);

var _reducer7 = require('../history/reducer');

var _reducer8 = _interopRequireDefault(_reducer7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultCoords = { x: 0, y: 0 };
var initialState = {
  entity: [],
  metaEntity: [],
  canvas: {
    cursor: defaultCoords,
    canvasViewport: {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    },
    canvasArtboard: {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    },
    connecting: {
      currently: false,
      from: ''
    },
    anchoredEntity: {
      isAnchored: false,
      id: ''
    },
    canvasAnchor: {
      isMoving: false,
      coords: defaultCoords
    },
    zoom: 1
  },
  config: {
    entityTypes: {}
  },
  history: {
    past: [],
    future: [],
    lastAction: '@@INIT'
  },
  lastAction: '@@INIT'
};

var appReducer = function appReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  return {
    canvas: (0, _reducer4.default)(state.canvas, action),
    entity: (0, _reducer2.default)(state.entity, action, state.metaEntity, state.canvas),
    metaEntity: (0, _reducer.metaEntityReducer)(state.metaEntity, action, state.entity, state.canvas),
    config: (0, _reducer6.default)(state.config, action),
    history: state.history,
    lastAction: action.type
  };
};

exports.default = (0, _reducer8.default)(appReducer);
module.exports = exports['default'];