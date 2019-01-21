var _templateObject = _taggedTemplateLiteralLoose(['\n  fill: none;\n  stroke-width: .1em;\n  stroke: black;\n  stroke-linejoin: round;\n  marker-end: url("#arrow-end");\n'], ['\n  fill: none;\n  stroke-width: .1em;\n  stroke: black;\n  stroke-linejoin: round;\n  marker-end: url("#arrow-end");\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  fill: none;\n  stroke-width: 1em;\n  stroke: transparent;\n  stroke-linejoin: round;\n'], ['\n  fill: none;\n  stroke-width: 1em;\n  stroke: transparent;\n  stroke-linejoin: round;\n']);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from 'react';
import style from 'styled-components';

/*
 * Presentational
 * ==================================== */

var Line = style.path(_templateObject);

var InteractionLine = style.path(_templateObject2);

var ArrowBody = function ArrowBody(_ref) {
  var points = _ref.points,
      id = _ref.id,
      label = _ref.label;
  return React.createElement(
    'g',
    null,
    React.createElement(Line, { d: points, id: 'line' + id }),
    React.createElement(InteractionLine, { d: points }),
    label && React.createElement(
      'text',
      { dy: '-.25rem' },
      React.createElement(
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
  return React.createElement(
    'g',
    null,
    props.links.map(function (link) {
      return link.points && React.createElement(ArrowBody, {
        key: link.target,
        id: link.target,
        label: link.label,
        points: pointsToString(link.points)
      });
    })
  );
};

export default ArrowBodyContainer;