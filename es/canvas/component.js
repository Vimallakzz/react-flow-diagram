var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n  min-height: 10em;\n  flex: 1 0 auto;\n  position: relative;\n  overflow: hidden;\n  background-color: #282828;\n\n  & * {\n    box-sizing: border-box;\n  }\n  & ul,\n  & ol {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n  }\n'], ['\n  min-height: 10em;\n  flex: 1 0 auto;\n  position: relative;\n  overflow: hidden;\n  background-color: #282828;\n\n  & * {\n    box-sizing: border-box;\n  }\n  & ul,\n  & ol {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  position: relative;\n  transform-origin: 0 0;\n  background-color: #eee;\n  overflow: hidden;\n'], ['\n  position: relative;\n  transform-origin: 0 0;\n  background-color: #eee;\n  overflow: hidden;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  top: 0;\n  left: 0;\n'], ['\n  position: absolute;\n  top: 0;\n  left: 0;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from 'react';
import style from 'styled-components';
import { connect } from 'react-redux';
import { configViewport, trackMovement, anchorCanvas, zoom } from './reducer';
import { undo, redo } from '../history/reducer';
import { setName } from '../entity/reducer';
import { icons } from '../icon/component';
import EntityHOC from '../entity/component';
import Panel from '../panel/component';
import Links from '../links/component';
import ArrowMarker from '../arrowMarker/component';
import Debug, { Fairy } from '../debug/component';
import calcLinkPoints from '../links/calcLinkPoints';
import elemLayout from './elemLayout';

/*
 * Presentational
 * ==================================== */

var CanvasViewport = style.div(_templateObject);

var CanvasArtboard = style.div.attrs({
  style: function style(props) {
    var restPercentage = 100 - 100 / props.gridSize;
    var defaultStyles = {
      transform: 'translate(' + props.artboard.x + 'px, ' + props.artboard.y + 'px) scale(' + props.zoomLevel + ')',
      width: props.artboard.width + 'px',
      height: props.artboard.height + 'px'
    };
    var gridStyle = {
      backgroundImage: 'linear-gradient(0deg, transparent 0%, transparent ' + restPercentage + '%, rgba(0, 0, 0, .2) 100%),\nlinear-gradient(90deg, transparent 0%, transparent ' + restPercentage + '%, rgba(0, 0, 0, .2) 100%)',
      backgroundSize: props.gridSize + 'px ' + props.gridSize + 'px'
    };
    return props.gridSize ? _extends({}, defaultStyles, gridStyle) : defaultStyles;
  }
})(_templateObject2);

var SvgLand = style.svg(_templateObject3);

var Canvas = function Canvas(props) {
  return React.createElement(
    CanvasViewport,
    {
      onMouseMove: props.onMouseMove,
      innerRef: function innerRef(div) {
        return props.handleRef(div);
      }
    },
    React.createElement(
      CanvasArtboard,
      {
        onMouseDown: props.onMouseDown,
        onMouseUp: props.onMouseUp,
        gridSize: props.gridSize,
        artboard: props.artboard,
        zoomLevel: props.zoomLevel
      },
      React.createElement(
        SvgLand,
        { width: '100%', height: '100%' },
        props.entities.filter(function (entity) {
          return 'linksTo' in entity;
        })
        // $FlowFixMe
        .map(function (entity) {
          return React.createElement(Links, { key: entity.id, links: entity.linksTo });
        }),
        props.isConnecting && React.createElement(Links, { links: props.connectingLink }),
        React.createElement(ArrowMarker, null)
      ),
      props.entities.map(function (entity) {
        return {
          entity: entity,
          CustomEntity: props.wrappedCustomEntities[entity.type]
        };
      }).map(function (Combo) {
        return React.createElement(Combo.CustomEntity, { key: Combo.entity.id, model: Combo.entity });
      })
    ),
    React.createElement(Panel, { zoomIn: props.zoomIn, zoomOut: props.zoomOut })
  );
};

/*
 * Container
 * ==================================== */

var CanvasContainer = function (_React$PureComponent) {
  _inherits(CanvasContainer, _React$PureComponent);

  function CanvasContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, CanvasContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.zoomSteps = [0.25, 0.5, 0.75, 1, 1.5, 2, 4], _this.state = {
      zoomStep: 3
    }, _this.wrappedCustomEntities = Object.assign.apply(Object, [{}].concat(Object.keys(_this.props.customEntities).map(function (type) {
      var _ref;

      return _ref = {}, _ref[type] = EntityHOC(connect(null, { setName: setName })(_this.props.customEntities[type].component)), _ref;
    }))), _this.handleKey = function (ev) {
      if (ev.getModifierState('Meta') || ev.getModifierState('Control')) {
        switch (ev.key) {
          case 'z':
            ev.preventDefault();
            _this.props.undo();
            break;
          case 'y':
            ev.preventDefault();
            _this.props.redo();
            break;
          // no default
        }
      }
    }, _this.onMouseDown = function () {
      _this.props.anchorCanvas(true);
    }, _this.onMouseMove = function (ev) {
      _this.props.trackMovement({
        x: ev.pageX,
        y: ev.pageY
      });
    }, _this.onMouseUp = function () {
      _this.props.anchorCanvas(false);
    }, _this.zoomIn = function () {
      _this.traverseZoomLevels(1);
    }, _this.zoomOut = function () {
      _this.traverseZoomLevels(-1);
    }, _this.handleRef = function (div) {
      if (_this.canvasDOM === undefined) {
        _this.canvasDOM = div;
        _this.setOffset();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CanvasContainer.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.document.addEventListener('keydown', this.handleKey);

    Object.keys(this.props.customEntities).forEach(function (entityType) {
      var _icons$addIcon;

      icons.addIcon((_icons$addIcon = {}, _icons$addIcon[entityType] = _this2.props.customEntities[entityType].icon, _icons$addIcon));
    });
  };

  CanvasContainer.prototype.componentWillUnmount = function componentWillUnmount() {
    window.document.removeEventListener('keydown', this.handleKey);
    this.canvasDOM = undefined;
    elemLayout.gc();
  };

  CanvasContainer.prototype.setOffset = function setOffset() {
    if (this.canvasDOM) {
      var cd = this.canvasDOM;
      elemLayout.set(cd);
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
      this.props.configViewport();
    }
  };

  CanvasContainer.prototype.traverseZoomLevels = function traverseZoomLevels(i) {
    var _this3 = this;

    var min = 0;
    var max = this.zoomSteps.length - 1;
    var potential = this.state.zoomStep + i;

    var determineZoomLevel = function determineZoomLevel(prevIndex) {
      if (potential > max) {
        return max;
      } else if (potential < min) {
        return min;
      } else {
        return prevIndex + i;
      }
    };
    this.setState(function (prevState) {
      return {
        zoomStep: determineZoomLevel(prevState.zoomStep)
      };
    }, function () {
      return _this3.props.zoom(_this3.zoomSteps[_this3.state.zoomStep]);
    });
  };

  CanvasContainer.prototype.render = function render() {
    return React.createElement(Canvas, {
      entities: this.props.entities,
      wrappedCustomEntities: this.wrappedCustomEntities,
      handleRef: this.handleRef,
      onMouseDown: this.onMouseDown,
      onMouseMove: this.onMouseMove,
      onMouseUp: this.onMouseUp,
      isConnecting: this.props.isConnecting,
      connectingLink: this.props.connectingLink,
      zoomLevel: this.props.zoomLevel,
      zoomIn: this.zoomIn,
      zoomOut: this.zoomOut,
      artboard: this.props.artboard,
      gridSize: this.props.gridSize
    });
  };

  return CanvasContainer;
}(React.PureComponent);

var makeConnectingLinks = function makeConnectingLinks(state) {
  if (state.canvas.connecting.currently) {
    var points = calcLinkPoints(state.entity.find(function (entity) {
      return entity.id === state.canvas.connecting.from;
    }), {
      x: state.canvas.cursor.x,
      y: state.canvas.cursor.y,
      width: 0,
      height: 0
    });
    return [{
      target: 'will_connect',
      edited: false,
      points: points
    }];
  } else {
    return [{ target: 'noop', edited: false }];
  }
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    entities: state.entity,
    isConnecting: state.canvas.connecting.currently,
    connectingLink: makeConnectingLinks(state),
    gridSize: state.canvas.gridSize,
    artboard: state.canvas.canvasArtboard,
    zoomLevel: state.canvas.zoom
  };
};

export default connect(mapStateToProps, {
  configViewport: configViewport,
  trackMovement: trackMovement,
  anchorCanvas: anchorCanvas,
  zoom: zoom,
  undo: undo,
  redo: redo
})(CanvasContainer);