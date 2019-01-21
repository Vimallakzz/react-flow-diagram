'use strict';

exports.__esModule = true;
exports.icons = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n  width: 1.25em;\n  & > path {\n    fill: #444;\n  }\n'], ['\n  width: 1.25em;\n  & > path {\n    fill: #444;\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }
/* eslint-disable react/require-default-props */

// Presentational Component
// ==================================================================

var Svg = _styledComponents2.default.svg(_templateObject);

var icons = function () {
  var iconList = {
    delete: {
      path: _react2.default.createElement('path', { d: 'M3 16h10l1-11H2zm7-14V0H6v2H1v3l1-1h12l1 1V2h-5zM9 2H7V1h2v1z' }),
      size: 16
    },
    arrow: {
      path: _react2.default.createElement('path', { d: 'M4.5 0l4 4L0 12.5 3.5 16 12 7.5l4 4V0H4.5z' }),
      size: 16
    },
    zoomIn: {
      path: _react2.default.createElement('path', { d: 'M15.5 13.6l-3.8-3.2c-.4-.4-.8-.5-1-.5.8-1.2 1.3-2.5 1.3-4 0-3.3-2.7-6-6-6S0 2.7 0 6s2.7 6 6 6c1.5 0 2.8-.5 4-1.4 0 .3 0 .7.4 1l3.2 4c.6.5 1.5.6 2 0s.5-1.4 0-2zM6 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm1-7H5v2H3v2h2v2h2V7h2V5H7z' }),
      size: 16
    },
    zoomOut: {
      path: _react2.default.createElement('path', { d: 'M15.5 13.6l-3.8-3.2c-.4-.4-.8-.5-1-.5.8-1.2 1.3-2.5 1.3-4 0-3.3-2.7-6-6-6S0 2.7 0 6s2.7 6 6 6c1.5 0 2.8-.5 4-1.4 0 .3 0 .7.4 1l3.2 4c.6.5 1.5.6 2 0s.5-1.4 0-2zM6 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zM3 5h6v2H3z' }),
      size: 16
    }
  };

  return {
    get: function get(iconName) {
      return iconName in iconList ? iconList[iconName] : iconList.arrow;
    },
    addIcon: function addIcon(icon) {
      iconList = _extends({}, iconList, icon);
    }
  };
}();

var Icon = function Icon(_ref) {
  var name = _ref.name,
      label = _ref.label;
  return _react2.default.createElement(
    Svg,
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 ' + icons.get(name).size.toString() + ' ' + icons.get(name).size.toString()
    },
    label && _react2.default.createElement(
      'title',
      null,
      label
    ),
    icons.get(name).path
  );
};

exports.default = Icon;
exports.icons = icons;