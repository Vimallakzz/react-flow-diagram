'use strict';

exports.__esModule = true;
exports.setCustom = exports.setConfig = exports.setEntities = exports.store = exports.diagramOn = exports.Diagram = undefined;

var _component = require('./diagram/component');

var _component2 = _interopRequireDefault(_component);

var _reducer = require('./entity/reducer');

var _reducer2 = require('./config/reducer');

var _diagramOn = require('./diagramOn/');

var _diagramOn2 = _interopRequireDefault(_diagramOn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Diagram = _component2.default;
exports.diagramOn = _diagramOn2.default;
exports.store = _component.store;
exports.setEntities = _reducer.setEntities;
exports.setConfig = _reducer2.setConfig;
exports.setCustom = _reducer.setCustom;