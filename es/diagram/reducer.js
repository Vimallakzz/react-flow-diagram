import entityReducer, { metaEntityReducer } from '../entity/reducer';
import canvasReducer from '../canvas/reducer';
import configReducer from '../config/reducer';
import history from '../history/reducer';

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
    canvas: canvasReducer(state.canvas, action),
    entity: entityReducer(state.entity, action, state.metaEntity, state.canvas),
    metaEntity: metaEntityReducer(state.metaEntity, action, state.entity, state.canvas),
    config: configReducer(state.config, action),
    history: state.history,
    lastAction: action.type
  };
};

export default history(appReducer);