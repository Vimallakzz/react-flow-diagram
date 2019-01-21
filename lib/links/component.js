'use strict';

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(['\n  fill: none;\n  stroke-width: .1em;\n  stroke: black;\n  stroke-linejoin: round;\n  marker-end: url("#arrow-end");\n'], ['\n  fill: none;\n  stroke-width: .1em;\n  stroke: black;\n  stroke-linejoin: round;\n  marker-end: url("#arrow-end");\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  fill: none;\n  stroke-width: 1em;\n  stroke: transparent;\n  stroke-linejoin: round;\n'], ['\n  fill: none;\n  stroke-width: 1em;\n  stroke: transparent;\n  stroke-linejoin: round;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

/*
 * Presentational
 * ==================================== */

var Line = _styledComponents2.default.path(_templateObject);

var InteractionLine = _styledComponents2.default.path(_templateObject2);

var ArrowBody = function ArrowBody(_ref) {
  var points = _ref.points,
      id = _ref.id,
      label = _ref.label;
  return _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement(Line, { d: points, id: 'line' + id }),
    _react2.default.createElement(InteractionLine, { d: points }),
    label && _react2.default.createElement(
      'text',
      { dy: '-.25rem' },
      _react2.default.createElement(
        'textPath',
        {
          xlinkHref: '#line' + id,
          startOffset: '33%',
          style: { fontSize: '.8rem' }
        },
        label
      )
    )
  );
};

/*
 * Container
 * ==================================== */

var pointsToString = function pointsToString(points) {
  return points.reduce(function (acc, curr) {
    return acc + ' ' + curr.x + ',' + curr.y + ' L';
  }, 'M').replace(/ L$/, '');
};

var ArrowBodyContainer = function ArrowBodyContainer(props) {
  return _react2.default.createElement(
    'g',
    null,
    props.links.map(function (link) {
      return link.points && _react2.default.createElement(ArrowBody, {
        key: link.target,
        id: link.target,
        label: link.label,
        points: pointsToString(link.points)
      });
    })
  );
};

exports.default = ArrowBodyContainer;
module.exports = exports['default'];