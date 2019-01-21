

var configReducer = function configReducer(state, action) {
  switch (action.type) {
    case 'rd/config/SET':
      return action.payload;

    default:
      return state;
  }
};

export var setConfig = function setConfig(payload) {
  return {
    type: 'rd/config/SET',
    payload: payload
  };
};

export default configReducer;