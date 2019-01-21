'use strict';

exports.__esModule = true;
exports.anchorCanvas = exports.anchorEntity = exports.connecting = exports.zoom = exports.trackMovement = exports.configViewport = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _elemLayout = require('./elemLayout');

var _elemLayout2 = _interopRequireDefault(_elemLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addEntityHelper = function addEntityHelper(id) {
  return {
    anchoredEntity: { isAnchored: true, id: id }
  };
};

var canvasArtboardDimensions = function canvasArtboardDimensions(canvasViewportDimensions, canvasArtboardPosition, zoomLevel) {
  return {
    width: (canvasViewportDimensions.width - canvasArtboardPosition.x) * (1 / zoomLevel),
    height: (canvasViewportDimensions.height - canvasArtboardPosition.y) * (1 / zoomLevel)
  };
};

var configViewportHelper = function configViewportHelper(state) {
  var layoutData = _elemLayout2.default.get();
  return _extends({}, state, {
    canvasViewport: layoutData,
    canvasArtboard: _extends({}, state.canvasArtboard, canvasArtboardDimensions(layoutData, state.canvasArtboard, state.zoom))
  });
};

var canvasReducer = function canvasReducer(state, action) {
  switch (action.type) {
    case 'rd/canvas/CONFIG_VIEWPORT':
      return configViewportHelper(state);

    case 'rd/config/SET':
      return _extends({}, state, {
        gridSize: action.payload.gridSize
      });

    case 'rd/canvas/TRACK':
      return state.canvasAnchor.isMoving ? _extends({}, state, {
        canvasArtboard: _extends({}, canvasArtboardDimensions(state.canvasViewport, {
          x: action.payload.x - state.canvasViewport.x - state.canvasAnchor.coords.x * state.zoom,
          y: action.payload.y - state.canvasViewport.y - state.canvasAnchor.coords.y * state.zoom
        }, state.zoom), {
          x: action.payload.x - state.canvasViewport.x - state.canvasAnchor.coords.x * state.zoom,
          y: action.payload.y - state.canvasViewport.y - state.canvasAnchor.coords.y * state.zoom
        })
      }) : _extends({}, state, {
        cursor: {
          x: (action.payload.x - state.canvasViewport.x - state.canvasArtboard.x) * (1 / state.zoom),
          y: (action.payload.y - state.canvasViewport.y - state.canvasArtboard.y) * (1 / state.zoom)
        }
      });

    case 'rd/canvas/ZOOM':
      return _extends({}, state, {
        zoom: action.payload,
        canvasArtboard: _extends({}, state.canvasArtboard, canvasArtboardDimensions(state.canvasViewport, state.canvasArtboard, action.payload))
      });

    case 'rd/canvas/CONNECT':
      return _extends({}, state, {
        connecting: action.payload
      });

    case 'rd/canvas/ANCHOR_CANVAS':
      return _extends({}, state, {
        canvasAnchor: {
          isMoving: action.payload,
          coords: state.cursor
        }
      });

    case 'rd/canvas/ANCHOR_ENTITY':
      return _extends({}, state, {
        anchoredEntity: action.payload
      });

    case 'rd/entity/ADD':
      return _extends({}, configViewportHelper(state), addEntityHelper(action.payload.id));

    case 'rd/entity/ADD_LINKED':
      return _extends({}, configViewportHelper(state), addEntityHelper(action.payload.entity.id));

    case 'rd/entity/LINK_TO':
      return _extends({}, state, {
        connecting: {
          currently: false,
          from: ''
        }
      });

    default:
      return state;
  }
};

var configViewport = exports.configViewport = function configViewport(payload) {
  return {
    type: 'rd/canvas/CONFIG_VIEWPORT',
    payload: payload
  };
};

var trackMovement = exports.trackMovement = function trackMovement(payload) {
  return {
    type: 'rd/canvas/TRACK',
    payload: payload
  };
};

var zoom = exports.zoom = function zoom(payload) {
  return {
    type: 'rd/canvas/ZOOM',
    payload: payload
  };
};

var connecting = exports.connecting = function connecting(payload) {
  return {
    type: 'rd/canvas/CONNECT',
    payload: payload
  };
};

var anchorEntity = exports.anchorEntity = function anchorEntity(_ref) {
  var _ref$isAnchored = _ref.isAnchored,
      isAnchored = _ref$isAnchored === undefined ? true : _ref$isAnchored,
      _ref$id = _ref.id,
      id = _ref$id === undefined ? '' : _ref$id;
  return {
    type: 'rd/canvas/ANCHOR_ENTITY',
    payload: { isAnchored: isAnchored, id: id }
  };
};

var anchorCanvas = exports.anchorCanvas = function anchorCanvas(payload) {
  return {
    type: 'rd/canvas/ANCHOR_CANVAS',
    payload: payload
  };
};

exports.default = canvasReducer;