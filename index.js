'use strict';

var moment = require('moment');
var ChangeCase = require('change-case');

/**
 * @return {object}
 */

module.exports = {

  WEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  addDaysToDate: function(date, daysToAdd) {
    const millisecondsToAdd = daysToAdd * 24 * 60 * 60 * 1000;
    const millisecondsSinceEpoch = date.getTime() + millisecondsToAdd;
    return new Date(millisecondsSinceEpoch);
  },

  alphabetizeArrayOfObjects: function(array, property) {
    if (array === undefined) {
      throw `alphabetize array of objects - array is missing (alphabetizing by ${property})`;
    }
    if (property === undefined) {
      throw `alphabetize array of objects - property is missing`;
    }
    return array.sort(function(a, b) {
      if (a[property] === undefined || b[property] === undefined) {
        throw `alphabetize array of objects - ${property} property does not exist in array element`;
      }
      if (a[property].toString().toUpperCase() < b[property].toString().toUpperCase()) {
        return -1;
      } else if (a[property].toString().toUpperCase() > b[property].toString().toUpperCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  },

  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  commonSort: function(property, entity) {
    if (!property || !entity) {
      throw `HandyTools.commonSort is missing proper arguments`;
    }
    var propertyValue = entity[property];
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
    let result = {};
    Object.keys(object).forEach((key) => {
      let value = object[key];
      if (typeof value === 'object' && Array.isArray(value) === false) {
        value = this.convertObjectKeysToUnderscore(value);
      }
      result[ChangeCase.snakeCase(key)] = value;
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

  daysDifference: function(date1, date2) {
    return ((date1 - date2) / 1000 / 60 / 60 / 24);
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

  findObjectInArrayById: function(array, id) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id == id) {
        return array[i];
      }
    }
    return null;
  },

  lpad: function(args) {
    let result = args.string;
    while (result.length < args.length) {
      result = args.padString + result;
    }
    return result;
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

  rearrangeFields: function(args) {
    var currentOrder = args.currentOrder;
    var draggedIndex = args.draggedIndex;
    var dropZoneIndex = args.dropZoneIndex;
    var result = {};
    if (dropZoneIndex == -1) {
      result[0] = currentOrder[draggedIndex];
      delete currentOrder[draggedIndex];
    }
    var currentValues = Object.values(currentOrder);
    for (var i = 0; i < Object.keys(currentOrder).length; i++) {
      if (dropZoneIndex == -1 || i != draggedIndex) {
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
    // assumes jQuery (and nice select) have been loaded via script tags
    var $dropDowns = $(obj.selector);
    $dropDowns.niceSelect('destroy');
    $dropDowns.unbind('change');
    $dropDowns.niceSelect().on('change', obj.func);
  },

  setUpNiceSelect: function(obj) {
    // assumes jQuery (and nice select) have been loaded via script tags
    var $dropDowns = $(obj.selector);
    if ($dropDowns[0] && (!$dropDowns[0].nextSibling || !$dropDowns[0].nextSibling.classList.contains('nice-select'))) {
      $dropDowns.niceSelect().on('change', obj.func);
    }
  },

  shuffleArray: function(input) {
    let array = input.slice(0);
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  stringifyDate: function(date) {
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear().toString().slice(-2);
  },

  stringifyFullDate: function(date) {
    return `${MONTHS[date.getMonth()]} ${this.ordinatize(date.getDate())}, ${date.getFullYear()}`;
  }

  stringifyDateWithHyphens: function(date) {
    const year = date.getFullYear().toString();
    const month = this.lpad({ string: (date.getMonth() + 1).toString(), padString: '0', length: 2 });
    const day = this.lpad({ string: date.getDate().toString(), padString: '0', length: 2 });
    return year + '-' + month + '-' + day;
  },

  stringIsDate(string) {
    if (!/^\d{1,2}\/\d{1,2}\/\d{2}$/.test(string)) { // First check for the pattern
      return false;
    }

    const parts = string.split('/');
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);

    if (month == 0 || month > 12) { // Check the range of month
      return false;
    }

    const monthLengths = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) { // Adjust for leap years
      monthLengths[1] = 29;
    }

    return day > 0 && day <= monthLengths[month - 1]; // Check the range of the day
  },

  stringIsNumber(string) {
    return !isNaN(string) && !isNaN(parseFloat(string));
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
  },

  stripTimeFromDate: function(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  },

  todayDMY: function() {
    const date = new Date;
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${dayOfMonth}/${year}`;
  }
};
