'use strict';

var moment = require('moment');
var ChangeCase = require('change-case');

/**
 * @return {object}
 */

module.exports = {

  WEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

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

  commonSort: function(entity) {
    var propertyValue = entity[this.state.searchProperty];
    if (typeof propertyValue === "string" || propertyValue instanceof String) {
      return propertyValue.toLowerCase();
    } else if (typeof propertyValue == "boolean") {
      return propertyValue.toString().toLowerCase();
    } else {
      return propertyValue;
    }
  },

  convertBooleanToTFString: function(boolean) {
    return boolean ? 't' : 'f';
  },

  convertObjectKeysToUnderscore: function(object) {
    var result = {};
    Object.keys(object).forEach(function(key) {
      result[ChangeCase.snakeCase(key)] = object[key];
    });
    return result;
  },

  convertTFStringsToBoolean: function(string) {
    if (string === "t") {
      return true;
    } else if (string === "f") {
      return false;
    } else {
      return string;
    }
  },

  convertToUnderscore: function(input) {
    return input.replace(/([A-Z1-9])/g, function($1) { return "_" + $1.toLowerCase(); }).replace('__', '_');
  },

  deepCopy: function(obj) {
    if (typeof obj == 'object') {
      if (Array.isArray(obj)) {
        var l = obj.length;
        var r = new Array(l);
        for (var i = 0; i < l; i++) {
          r[i] = this.deepCopy(obj[i]);
        }
        return r;
      } else {
        var r = {};
        r.prototype = obj.prototype;
        for (var k in obj) {
          r[k] = this.deepCopy(obj[k]);
        }
        return r;
      }
    }
    return obj;
  },

  ellipsis: function(string, n) {
  	if (string.length > n) {
      return string.slice(0, n) + "...";
    } else {
      return string;
    }
  },

  filterArrayOfDateStrings: function(array, property, obj) {
    if (obj.startDate && obj.endDate) {
      return array.filter(function(element) {
        return (+moment(element[property]).format('x') >= obj.startDate) && (+moment(element[property]).format('x') <= obj.endDate);
      });
    } else if (obj.startDate) {
      return array.filter(function(element) {
        return +moment(element[property]).format('x') >= obj.startDate;
      });
    } else if (obj.endDate) {
      return array.filter(function(element) {
        return +moment(element[property]).format('x') <= obj.endDate;
      });
    } else {
      return array;
    }
  },

  modalSelectStyles: function() {
    return {
      overlay: {
        background: 'rgba(0, 0, 0, 0.50)'
      },
      content: {
        background: '#FFFFFF',
        margin: 'auto',
        maxWidth: 540,
        height: '90%',
        border: 'solid 1px #5F5F5F',
        borderRadius: '6px',
        textAlign: 'center',
        color: '#5F5F5F'
      }
    };
  },

  objectsAreEqual: function(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  },

  ordinatize: function(input) {
    var j = input % 10,
        k = input % 100;
    if (j == 1 && k != 11) {
        return input + "st";
    }
    if (j == 2 && k != 12) {
        return input + "nd";
    }
    if (j == 3 && k != 13) {
        return input + "rd";
    }
    return input + "th";
  },

  params: function() {
    var result = {};
    var urlParamString = window.location.search.substring(1);
    if (urlParamString) {
      var urlParams = urlParamString.split('&');
      urlParams.forEach(function(param) {
        var paramKeyValuePair = param.split('=');
        var key = paramKeyValuePair[0];
        var value = paramKeyValuePair[1];
        var isArray = (key.slice(-2) === '[]');
        if (isArray) {
          if (result[key]) {
            result[key].push(value);
          } else {
            result[key] = [value];
          }
        } else {
          result[key] = value;
        }
      });
    }
    return result;
  },

  pluckFromObjectsArray: function(args) {
    for (let i = 0; i < args.array.length; i++) {
      if (args.array[i][args.property] === args.value) {
        return args.array[i];
      }
    }
  },

  pluralize: function(string, n) {
    if (n === 1) {
      return string;
    } else {
      return string + 's';
    }
  },

  rearrangeFields: function(currentOrder, draggedIndex, dropZoneIndex) {
    var result = {};
    if (dropZoneIndex == -1) {
      result[0] = currentOrder[draggedIndex];
      delete currentOrder[draggedIndex];
    }
    var currentValues = Object.values(currentOrder);
    for (var i = 0; i < Object.keys(currentOrder).length; i++) {
      if (i != draggedIndex) {
        result[Object.keys(result).length] = currentValues[i];
      }
      if (i == dropZoneIndex) {
        result[Object.keys(result).length] = currentValues[draggedIndex];
      }
    }
    return result;
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

  resetNiceSelect: function(obj) {
    var $dropDowns = $(obj.selector);
    $dropDowns.niceSelect('destroy');
    $dropDowns.unbind('change');
    $dropDowns.niceSelect().on('change', obj.func);
  },

  setUpNiceSelect: function(obj) {
    var $dropDowns = $(obj.selector);
    if ($dropDowns[0] && (!$dropDowns[0].nextSibling || !$dropDowns[0].nextSibling.classList.contains('nice-select'))) {
      $dropDowns.niceSelect().on('change', obj.func);
    }
  },

  stringifyDate: function(date) {
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear().toString().slice(-2);
  },

  stringifyDateWithHyphens: function(date) {
    return date.getFullYear().toString() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
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

  sortArrayOfObjects: function(array, arg) {
    let property = Array.isArray(arg) ? arg[0] : arg;
    return array.sort(function(a, b) {
      if (parseInt(a[property]) < parseInt(b[property])) {
        return -1;
      } else if (parseInt(a[property]) > parseInt(b[property])) {
        return 1;
      } else {
        if (Array.isArray(arg)) {
          property = arg[1];
          if (parseInt(a[property]) < parseInt(b[property])) {
            return -1;
          } else if (parseInt(a[property]) > parseInt(b[property])) {
            return 1;
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      }
    });
  }
};
