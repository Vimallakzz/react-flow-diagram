var _templateObject = _taggedTemplateLiteralLoose(['\n  fill: black;\n  stroke-width: 1px;\n  stroke-linecap: round;\n  stroke-dasharray: 10000, 1;\n  stroke: black;\n'], ['\n  fill: black;\n  stroke-width: 1px;\n  stroke-linecap: round;\n  stroke-dasharray: 10000, 1;\n  stroke: black;\n']);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from 'react';
import style from 'styled-components';

/*
 * Presentational
 * ==================================== */

var Arrow = style.path(_templateObject);

var ArrowMarker = function ArrowMarker() {
  return React.createElement(
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
    React.createElement(Arrow, { d: 'M 1 5 L 11 10 L 1 15 Z' })
  );
};

export default ArrowMarker;