'use strict';

exports.__esModule = true;
exports.unselectAll = exports.selectEntity = exports.setCustom = exports.setName = exports.move = exports.removeEntity = exports.addLinkedEntity = exports.linkTo = exports.addEntity = exports.setEntities = exports.metaEntityReducer = exports.EntityActionTypesModify = exports.EntityActionTypeOpen = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _calcLinkPoints = require('../links/calcLinkPoints');

var _calcLinkPoints2 = _interopRequireDefault(_calcLinkPoints);

var _positionAdjustedToGrid = require('../canvas/positionAdjustedToGrid');

var _positionAdjustedToGrid2 = _interopRequireDefault(_positionAdjustedToGrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EntityActionTypeOpen = exports.EntityActionTypeOpen = 'rd/entity/SET';
var EntityActionTypesModify = exports.EntityActionTypesModify = ['rd/entity/ADD', 'rd/entity/LINK_TO', 'rd/entity/ADD_LINKED', 'rd/entity/REMOVE', 'rd/entity/MOVE', 'rd/entity/SET_NAME', 'rd/entity/SET_CUSTOM'];

var entityReducer = function entityReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];
  var metaEntity = arguments[2];
  var canvas = arguments[3];

  switch (action.type) {
    case 'rd/entity/SET':
      return action.payload;

    case 'rd/config/SET':
      {
        var configs = action.payload;
        return state.map(function (entity) {
          var relevantConfig = configs.entityTypes[entity.type];
          return relevantConfig ? _extends({}, entity, {
            width: relevantConfig.width,
            height: relevantConfig.height
          }) : entity;
        });
      }

    case 'rd/entity/ADD':
      return [].concat(state, [{
        id: action.payload.id,
        type: action.payload.type,
        width: action.payload.width,
        height: action.payload.height,
        x: action.payload.x,
        y: action.payload.y,
        name: action.payload.name
      }]);

    case 'rd/entity/LINK_TO':
      {
        var payload = action.payload;

        return state.map(function (entity) {
          return entity.id === canvas.connecting.from ? _extends({}, entity, {
            linksTo: [].concat(entity.linksTo ? entity.linksTo : [], entity.linksTo && entity.linksTo.some(function (link) {
              return link.target === payload;
            }) ? [] : [{
              target: payload,
              edited: false,
              points: (0, _calcLinkPoints2.default)(entity, state.find(function (ent) {
                return ent.id === payload;
              }))
            }])
          }) : entity;
        });
      }

    case 'rd/entity/ADD_LINKED':
      {
        var _action$payload = action.payload,
            _entity = _action$payload.entity,
            _id = _action$payload.id;

        return [].concat(state.map(function (existingEntity) {
          return existingEntity.id === _id ? _extends({}, existingEntity, {
            linksTo: [].concat(existingEntity.linksTo ? existingEntity.linksTo : [], [{ target: _entity.id, edited: false }])
          }) : existingEntity;
        }), [{
          id: _entity.id,
          type: _entity.type,
          width: _entity.width,
          height: _entity.height,
          x: _entity.x,
          y: _entity.y,
          name: _entity.name
        }]);
      }

    case 'rd/entity/REMOVE':
      return state.filter(function (entity) {
        return entity.id !== action.payload;
      }).map(function (entity) {
        return entity.linksTo ? _extends({}, entity, {
          linksTo: entity.linksTo.filter(function (link) {
            return link.target !== action.payload;
          })
        }) : entity;
      });

    case 'rd/canvas/TRACK':
      {
        if (canvas.anchoredEntity.isAnchored) {
          var _id2 = canvas.anchoredEntity.id;

          var mEntity = metaEntity.find(function (e) {
            return e.id === _id2;
          }) || {
            anchor: { x: 0, y: 0 }
          };
          var _x2 = canvas.cursor.x - mEntity.anchor.x;
          var _y = canvas.cursor.y - mEntity.anchor.y;
          var gridX = (0, _positionAdjustedToGrid2.default)(_x2, canvas.gridSize);
          var gridY = (0, _positionAdjustedToGrid2.default)(_y, canvas.gridSize);
          return state.map(function (entity) {
            if (entity.linksTo && entity.id === _id2) {
              return _extends({}, entity, {
                x: gridX,
                y: gridY,
                linksTo: entity.linksTo.map(function (link) {
                  return _extends({}, link, {
                    points: (0, _calcLinkPoints2.default)(entity, state.find(function (ent) {
                      return ent.id === link.target;
                    }))
                  });
                })
              });
            } else if (entity.id === _id2) {
              return _extends({}, entity, {
                x: gridX,
                y: gridY
              });
            } else if (entity.linksTo && entity.linksTo.some(function (link) {
              return link.target === _id2;
            })) {
              return _extends({}, entity, {
                linksTo: entity.linksTo.map(function (link) {
                  return link.target === _id2 ? _extends({}, link, {
                    points: (0, _calcLinkPoints2.default)(entity, state.find(function (ent) {
                      return ent.id === _id2;
                    }))
                  }) : link;
                })
              });
            } else {
              return entity;
            }
          });
        } else {
          return state;
        }
      }

    // All this logic can be potentially removed, research if I'll still use
    // the MOVE action... or perhaps put all this into its own function and
    // reuse :shrug:
    case 'rd/entity/MOVE':
      {
        var _action$payload2 = action.payload,
            _id3 = _action$payload2.id,
            _x3 = _action$payload2.x,
            _y2 = _action$payload2.y;

        var _gridX = (0, _positionAdjustedToGrid2.default)(_x3, canvas.gridSize);
        var _gridY = (0, _positionAdjustedToGrid2.default)(_y2, canvas.gridSize);
        return state.map(function (entity) {
          if (entity.linksTo && entity.id === _id3) {
            return _extends({}, entity, {
              x: _gridX,
              y: _gridY,
              linksTo: entity.linksTo.map(function (link) {
                return _extends({}, link, {
                  points: (0, _calcLinkPoints2.default)(entity, state.find(function (ent) {
                    return ent.id === link.target;
                  }))
                });
              })
            });
          } else if (entity.id === _id3) {
            return _extends({}, entity, {
              x: _gridX,
              y: _gridY
            });
          } else if (entity.linksTo && entity.linksTo.some(function (link) {
            return link.target === _id3;
          })) {
            return _extends({}, entity, {
              linksTo: entity.linksTo.map(function (link) {
                return link.target === _id3 ? _extends({}, link, {
                  points: (0, _calcLinkPoints2.default)(entity, state.find(function (ent) {
                    return ent.id === _id3;
                  }))
                }) : link;
              })
            });
          } else {
            return entity;
          }
        });
      }

    case 'rd/entity/SET_NAME':
      {
        var _action$payload3 = action.payload,
            _id4 = _action$payload3.id,
            _name = _action$payload3.name;

        return state.map(function (entity) {
          return entity.id === _id4 ? _extends({}, entity, {
            name: _name
          }) : entity;
        });
      }

    case 'rd/entity/LINK_POINTS':
      {
        var _action$payload4 = action.payload,
            from = _action$payload4.from,
            to = _action$payload4.to,
            _points = _action$payload4.points;

        return state.map(function (entity) {
          return entity.id === from ? _extends({}, entity, {
            linksTo: entity.linksTo ? entity.linksTo.map(function (link) {
              return link.target === to ? _extends({}, link, {
                points: _points
              }) : link;
            }) : [{ target: to, points: _points }]
          }) : entity;
        });
      }

    case 'rd/entity/SET_CUSTOM':
      {
        var _action$payload5 = action.payload,
            _id5 = _action$payload5.id,
            _custom = _action$payload5.custom;

        return state.map(function (entity) {
          return entity.id === _id5 ? _extends({}, entity, {
            custom: _custom
          }) : entity;
        });
      }
    default:
      return state;
  }
};

var unselectMetaEntity = function unselectMetaEntity(metaEntity) {
  return _extends({}, metaEntity, { isSelected: false });
};

var metaEntityReducer = exports.metaEntityReducer = function metaEntityReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];
  var entity = arguments[2];
  var canvas = arguments[3];

  switch (action.type) {
    case 'rd/entity/SET':
      return action.payload.map(function (ent) {
        return {
          id: ent.id,
          isAnchored: false,
          isSelected: false,
          anchor: {
            x: ent.width / 2,
            y: ent.height / 2
          }
        };
      });

    case 'rd/entity/ADD':
      return [].concat(state, [{
        id: action.payload.id,
        isAnchored: action.payload.isAnchored,
        isSelected: action.payload.isSelected,
        anchor: {
          x: action.payload.width / 2,
          y: action.payload.height / 2
        }
      }]);
    case 'rd/entity/ADD_LINKED':
      return [].concat(state.map(unselectMetaEntity), [{
        id: action.payload.entity.id,
        isAnchored: action.payload.entity.isAnchored,
        isSelected: action.payload.entity.isSelected,
        anchor: {
          x: action.payload.entity.width / 2,
          y: action.payload.entity.height / 2
        }
      }]);

    case 'rd/metaentity/SELECT':
      {
        var _action$payload6 = action.payload,
            _id6 = _action$payload6.id,
            _isSelected = _action$payload6.isSelected;

        return state.map(function (metaEntity) {
          return metaEntity.id === _id6 ? _extends({}, metaEntity, { isSelected: _isSelected }) : _extends({}, metaEntity, { isSelected: false });
        });
      }

    case 'rd/canvas/ANCHOR_ENTITY':
      {
        var _id7 = action.payload.id;

        return state.map(function (metaEntity) {
          return metaEntity.id === _id7 ? _extends({}, metaEntity, {
            isAnchored: true,
            anchor: {
              x: canvas.cursor.x - (entity.find(function (e) {
                return e.id === _id7;
              }) || { x: 0 }).x,
              y: canvas.cursor.y - (entity.find(function (e) {
                return e.id === _id7;
              }) || { y: 0 }).y
            }
          }) : _extends({}, metaEntity, { isAnchored: false });
        });
      }

    case 'rd/entity/REMOVE':
      return state.filter(function (ent) {
        return ent.id !== action.payload;
      });

    case 'rd/entity/CONNECT':
    case 'rd/metaentity/UNSELECTALL':
    case 'rd/canvas/ANCHOR_CANVAS':
      return state.map(unselectMetaEntity);

    default:
      return state;
  }
};

var setEntities = exports.setEntities = function setEntities(payload) {
  return {
    type: 'rd/entity/SET',
    payload: payload
  };
};

var addEntity = exports.addEntity = function addEntity(payload) {
  return { type: 'rd/entity/ADD', payload: payload };
};

var linkTo = exports.linkTo = function linkTo(payload) {
  return {
    type: 'rd/entity/LINK_TO',
    payload: payload
  };
};

var addLinkedEntity = exports.addLinkedEntity = function addLinkedEntity(payload) {
  return { type: 'rd/entity/ADD_LINKED', payload: payload };
};

var removeEntity = exports.removeEntity = function removeEntity(payload) {
  return {
    type: 'rd/entity/REMOVE',
    payload: payload
  };
};

var move = exports.move = function move(payload) {
  return {
    type: 'rd/entity/MOVE',
    payload: payload
  };
};

var setName = exports.setName = function setName(payload) {
  return {
    type: 'rd/entity/SET_NAME',
    payload: payload
  };
};

var setCustom = exports.setCustom = function setCustom(payload) {
  return {
    type: 'rd/entity/SET_CUSTOM',
    payload: payload
  };
};

var selectEntity = exports.selectEntity = function selectEntity(id) {
  var isSelected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return {
    type: 'rd/metaentity/SELECT',
    payload: { id: id, isSelected: isSelected }
  };
};

var unselectAll = exports.unselectAll = function unselectAll() {
  return {
    type: 'rd/metaentity/UNSELECTALL',
    payload: null
  };
};

exports.default = entityReducer;