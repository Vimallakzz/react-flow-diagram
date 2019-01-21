"use strict";

exports.__esModule = true;

var elemLayout = function () {
  var elem = null;

  var set = function set(e) {
    elem = e;
  };

  var gc = function gc() {
    elem = undefined;
  };

  var get = function get() {
    if (elem) {
      var _elem$getBoundingClie = elem.getBoundingClientRect(),
          left = _elem$getBoundingClie.left,
          top = _elem$getBoundingClie.top,
          _width = _elem$getBoundingClie.width,
          _height = _elem$getBoundingClie.height;

      return {
        width: parseInt(_width, 10),
        height: parseInt(_height, 10),
        x: parseInt(left, 10),
        y: parseInt(top, 10)
      };
    } else {
      return {
        width: 100,
        height: 100,
        x: 0,
        y: 0
      };
    }
  };

  return { set: set, get: get, gc: gc };
}();

exports.default = elemLayout;
module.exports = exports["default"];