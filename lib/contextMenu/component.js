'use strict';

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  right: -.5em;\n  transform: translateX(100%);\n  align-self: flex-start;\n'], ['\n  position: absolute;\n  right: -.5em;\n  transform: translateX(100%);\n  align-self: flex-start;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  cursor: pointer;\n'], ['\n  cursor: pointer;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _component = require('../icon/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

/*
 * Presentational
 * ==================================== */

var ContextMenuStyle = _styledComponents2.default.ul(_templateObject);

var Action = _styledComponents2.default.li(_templateObject2);

var stopActionPropagation = function stopActionPropagation(action) {
  return function (ev) {
    ev.stopPropagation();
    action(ev);
  };
};

var ContextMenu = function ContextMenu(props) {
  return _react2.default.createElement(
    ContextMenuStyle,
    null,
    props.actions.map(function (action) {
      return _react2.default.createElement(
        Action,
        {
          key: action.label,
          onMouseDown: stopActionPropagation(action.action)
        },
        _react2.default.createElement(_component2.default, { name: action.iconVariety, label: action.label })
      );
    })
  );
};

exports.default = ContextMenu;
module.exports = exports['default'];