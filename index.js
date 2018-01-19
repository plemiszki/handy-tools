'use strict';

var moment = require('moment');

/**
 * @return {object}
 */

module.exports = {

  alphabetizeArrayOfObjects: function(array, property) {
    return array.sort(function(a, b) {
      if (a[property].toUpperCase() < b[property].toUpperCase()) {
        return -1;
      } else if (a[property].toUpperCase() > b[property].toUpperCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  },

  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  ellipsis: function(string, n) {
  	if (string.length > n) {
      return string.slice(0, n) + "...";
    } else {
      return string;
    }
  };

  pluralize: function(string, n) {
    if (n === 1) {
      return this;
    } else {
      return this + 's';
    }
  },

  removeFinanceSymbols: function(string) {
    return string.replace('$', '').replace(',', '');
  },

  removeFromArray: function(array, element) {
    var index = array.indexOf(element);
    if (index >= 0) {
      array.splice(index, 1);
    }
    return array;
  },

  sortArrayOfDateStrings: function(array, property) {
    return array.sort(function(a, b) {
      if (+moment(a[property]).format('x') < +moment(b[property]).format('x')) {
        return -1;
      } else if (+moment(a[property]).format('x') > +moment(b[property]).format('x')) {
        return 1;
      } else {
        return 0;
      }
    });
  },

  sortArrayOfObjects: function(array, property) {
    return array.sort(function(a, b) {
      if (parseInt(a[property]) < parseInt(b[property])) {
        return -1;
      } else if (parseInt(a[property]) > parseInt(b[property])) {
        return 1;
      } else {
        return 0;
      }
    });
  }
};
