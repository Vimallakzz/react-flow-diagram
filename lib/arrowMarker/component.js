'use strict';

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(['\n  fill: black;\n  stroke-width: 1px;\n  stroke-linecap: round;\n  stroke-dasharray: 10000, 1;\n  stroke: black;\n'], ['\n  fill: black;\n  stroke-width: 1px;\n  stroke-linecap: round;\n  stroke-dasharray: 10000, 1;\n  stroke: black;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

/*
 * Presentational
 * ==================================== */

var Arrow = _styledComponents2.default.path(_templateObject);

var ArrowMarker = function ArrowMarker() {
  return _react2.default.createElement(
    'marker',
    {
      id: 'arrow-end',
      viewBox: '0 0 20 20',
      refX: '11',
      refY: '10',
      markerWidth: '10',
      markerHeight: '10',
      orient: 'auto'
    },
    _react2.default.createElement(Arrow, { d: 'M 1 5 L 11 10 L 1 15 Z' })
  );
};

exports.default = ArrowMarker;
module.exports = exports['default'];