var _templateObject = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  left: 0;\n  top: 0;\n'], ['\n  position: absolute;\n  left: 0;\n  top: 0;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n'], ['\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  width: ', 'px;\n  height: ', 'px;\n  padding: .6em;\n  ', '\n  background-color: #ddd;\n  transition: background-color ease-in 80ms;\n  cursor: pointer;\n\n  &:hover {\n    background-color: #ccc;\n  }\n\n  & > svg {\n    display: block;\n    width: 100%;\n  }\n'], ['\n  width: ', 'px;\n  height: ', 'px;\n  padding: .6em;\n  ', '\n  background-color: #ddd;\n  transition: background-color ease-in 80ms;\n  cursor: pointer;\n\n  &:hover {\n    background-color: #ccc;\n  }\n\n  & > svg {\n    display: block;\n    width: 100%;\n  }\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from 'react';
import style from 'styled-components';
import { connect } from 'react-redux';
import Icon from '../icon/component';
import { addEntity } from '../entity/reducer';
import defaultEntity from '../entity/defaultEntity';

/*
 * Presentational
 * ==================================== */

var PanelStyle = style.div(_templateObject);

var PanelTools = style.ul(_templateObject2);

var PanelTool = style.li(_templateObject3, function (props) {
  return props.width;
}, function (props) {
  return props.width;
}, function (props) {
  return props.separator ? 'border-top: 1px solid rgba(0, 0, 0, .25);' : '';
});

var Panel = function Panel(props) {
  return React.createElement(
    PanelStyle,
    null,
    React.createElement(
      PanelTools,
      null,
      props.entityTypeNames.map(function (entityTypeName) {
        return React.createElement(
          PanelTool,
          {
            width: props.toolWidth(),
            key: entityTypeName,
            onMouseDown: function onMouseDown() {
              return props.addEntityHelper(entityTypeName);
            }
          },
          React.createElement(Icon, { name: entityTypeName, label: 'Add ' + entityTypeName })
        );
      }),
      React.createElement(
        PanelTool,
        {
          separator: true,
          width: props.toolWidth(),
          onMouseDown: function onMouseDown() {
            return props.zoomIn();
          }
        },
        React.createElement(Icon, { name: 'zoomIn', label: 'Zoom in' })
      ),
      React.createElement(
        PanelTool,
        { width: props.toolWidth(), onMouseDown: function onMouseDown() {
            return props.zoomOut();
          } },
        React.createElement(Icon, { name: 'zoomOut', label: 'Zoom out' })
      )
    )
  );
};

/*
 * Container
 * ==================================== */

var PanelContainer = function (_React$PureComponent) {
  _inherits(PanelContainer, _React$PureComponent);

  function PanelContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, PanelContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.entityTypeNames = Object.keys(_this.props.entityTypes), _this.minToolSize = 40, _this.niceToolSize = 50, _this.addEntityHelper = function () {
      var entityType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Task';

      _this.props.addEntity(_this.props.defaultEntity({ entityType: entityType }));
    }, _this.toolWidth = function () {
      if (typeof _this.props.gridSize === 'number') {
        var _gridSize = _this.props.gridSize;
        var howManyFit = parseInt(_this.minToolSize / _this.props.gridSize, 10);
        var theRest = _this.minToolSize * howManyFit % _gridSize;
        var fittingSize = theRest === 0 ? howManyFit * _gridSize : (howManyFit + 1) * _gridSize;
        return fittingSize === 0 ? _gridSize : fittingSize;
      } else {
        return _this.niceToolSize;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  PanelContainer.prototype.render = function render() {
    return React.createElement(Panel, {
      addEntityHelper: this.addEntityHelper,
      entityTypeNames: this.entityTypeNames,
      toolWidth: this.toolWidth,
      zoomIn: this.props.zoomIn,
      zoomOut: this.props.zoomOut
    });
  };

  return PanelContainer;
}(React.PureComponent);

var mapStateToProps = function mapStateToProps(state) {
  return {
    entityTypes: state.config.entityTypes,
    defaultEntity: defaultEntity(state),
    gridSize: state.canvas.gridSize
  };
};

export default connect(mapStateToProps, { addEntity: addEntity })(PanelContainer);