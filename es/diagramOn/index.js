import { store } from '../diagram/component';
import { EntityActionTypeOpen, EntityActionTypesModify } from '../entity/reducer';

// ['a','b','c'].indexOf('a') > -1 === ['a','b','c'].includes('a')
//
var isLastAction = function isLastAction(lastAction, action) {
  return typeof action === 'string' ? lastAction === action : action.indexOf(lastAction) > -1;
};

// Here we respond to two custom events, 'anyChange' and 'open', both related
// just to entity reducer actions (since what we return is just the entity
// reducer state).
//
// 'open' will respond to setting a completely new diagram ('rd/entity/SET')
// 'anyChange' will respond to any other change except opening a new diagram
//
var lastActionMatchesAction = function lastActionMatchesAction(lastAction, action) {
  switch (action) {
    case 'anyChange':
      return EntityActionTypesModify.indexOf(lastAction) > -1;
    case 'open':
      return lastAction === EntityActionTypeOpen;
    default:
      return isLastAction(lastAction, action);
  }
};

// diagramOn will return a function
// that allows you to unsubscribe from the store
// http://redux.js.org/docs/api/Store.html#subscribelistener
//
var diagramOn = function diagramOn(action, fn) {
  return store.subscribe(function () {
    var state = store.getState();
    if (lastActionMatchesAction(state.lastAction, action)) {
      fn(state.entity);
    }
  });
};

export default diagramOn;