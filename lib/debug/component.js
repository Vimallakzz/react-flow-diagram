'use strict';

exports.__esModule = true;
exports.Fairy = undefined;

var _templateObject = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 777;\n\n  & button {\n    cursor: pointer;\n  }\n'], ['\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 777;\n\n  & button {\n    cursor: pointer;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 11px;\n  height: 18px;\n  background-color: rgba(255, 0, 0, 0.5);\n'], ['\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 11px;\n  height: 18px;\n  background-color: rgba(255, 0, 0, 0.5);\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRedux = require('react-redux');

var _reducer = require('../history/reducer');

var _reducer2 = require('../canvas/reducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var Panel = _styledComponents2.default.div(_templateObject);

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
    return _react2.default.createElement(
      Panel,
      null,
      _react2.default.createElement(
        'button',
        { onClick: this.props.undo },
        'UNDO'
      ),
      _react2.default.createElement(
        'button',
        { onClick: this.props.redo },
        'REDO'
      ),
      _react2.default.createElement(
        'button',
        { onClick: this.toggleZoom },
        'zoom'
      )
    );
  };

  return Debug;
}(_react2.default.Component);

// Default export is <Debug /> component, to live inside of <CanvasViewport>.
// It adds buttons to move history, zoom and pan.


exports.default = (0, _reactRedux.connect)(null, { undo: _reducer.undo, redo: _reducer.redo, zoom: _reducer2.zoom })(Debug);

// https://github.com/flowtype/flow-typed/issues/1269#issuecomment-332100335

var mapStateToProps = function mapStateToProps(state) {
  return {
    canvas: state.canvas
  };
};

// <Fairy /> component lives inside <CanvasArtboard>
// and follows the cursor around
var Fairy = exports.Fairy = (0, _reactRedux.connect)(mapStateToProps)(_styledComponents2.default.div.attrs({
  style: function style(props) {
    return {
      transform: 'translate(' + props.canvas.cursor.x + 'px, ' + props.canvas.cursor.y + 'px)'
    };
  }
})(_templateObject2));