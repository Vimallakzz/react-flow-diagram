'use strict';

exports.__esModule = true;
exports.setCustom = exports.setConfig = exports.setEntities = exports.workflowReducer = exports.Diagram = undefined;

var _component = require('./diagram/component');

var _component2 = _interopRequireDefault(_component);

var _reducer = require('./entity/reducer');

var _reducer2 = require('./config/reducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import diagramOn from './diagramOn/';

// export { Diagram, diagramOn, store, setEntities, setConfig, setCustom };
exports.Diagram = _component2.default;
exports.workflowReducer = _component.workflowReducer;
exports.setEntities = _reducer.setEntities;
exports.setConfig = _reducer2.setConfig;
exports.setCustom = _reducer.setCustom;

// import Diagram, { store } from './diagram/component';