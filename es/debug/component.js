var _templateObject = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 777;\n\n  & button {\n    cursor: pointer;\n  }\n'], ['\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 777;\n\n  & button {\n    cursor: pointer;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 11px;\n  height: 18px;\n  background-color: rgba(255, 0, 0, 0.5);\n'], ['\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 11px;\n  height: 18px;\n  background-color: rgba(255, 0, 0, 0.5);\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from 'react';
import style from 'styled-components';
import { connect } from 'react-redux';
import { undo, redo } from '../history/reducer';
import { zoom } from '../canvas/reducer';

var Panel = style.div(_templateObject);

var Debug = function (_React$Component) {
  _inherits(Debug, _React$Component);

  function Debug() {
    var _temp, _this, _ret;

    _classCallCheck(this, Debug);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      zoomStep: 0,
      positionStep: 0
    }, _this.zoomPhases = [0.5, 2, 0.75, 1], _this.positionPhases = [[100, 100], [100, 400], [400, 100], [-100, 100], [-100, -100], [100, -100], [200, 200], [100, 100], [0, 0]], _this.toggleZoom = function () {
      _this.setState(function (prevState) {
        return {
          zoomStep: (prevState.zoomStep + 1) % _this.zoomPhases.length
        };
      });
      _this.props.zoom(_this.zoomPhases[_this.state.zoomStep]);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Debug.prototype.render = function render() {
    return React.createElement(
      Panel,
      null,
      React.createElement(
        'button',
        { onClick: this.props.undo },
        'UNDO'
      ),
      React.createElement(
        'button',
        { onClick: this.props.redo },
        'REDO'
      ),
      React.createElement(
        'button',
        { onClick: this.toggleZoom },
        'zoom'
      )
    );
  };

  return Debug;
}(React.Component);

// Default export is <Debug /> component, to live inside of <CanvasViewport>.
// It adds buttons to move history, zoom and pan.


export default connect(null, { undo: undo, redo: redo, zoom: zoom })(Debug);

// https://github.com/flowtype/flow-typed/issues/1269#issuecomment-332100335
var mapStateToProps = function mapStateToProps(state) {
  return {
    canvas: state.canvas
  };
};

// <Fairy /> component lives inside <CanvasArtboard>
// and follows the cursor around
export var Fairy = connect(mapStateToProps)(style.div.attrs({
  style: function style(props) {
    return {
      transform: 'translate(' + props.canvas.cursor.x + 'px, ' + props.canvas.cursor.y + 'px)'
    };
  }
})(_templateObject2));