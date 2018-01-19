'use strict';

/**
 * @return {object}
 */

module.exports = {

  removeFromArray: function(array, element) {
    var index = array.indexOf(element);
    if (index >= 0) {
      array.splice(index, 1);
    }
    return array;
  }
};
