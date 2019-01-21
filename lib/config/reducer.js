'use strict';

exports.__esModule = true;


var configReducer = function configReducer(state, action) {
  switch (action.type) {
    case 'rd/config/SET':
      return action.payload;

    default:
      return state;
  }
};

var setConfig = exports.setConfig = function setConfig(payload) {
  return {
    type: 'rd/config/SET',
    payload: payload
  };
};

exports.default = configReducer;