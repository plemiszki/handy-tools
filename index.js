'use strict';

var moment = require('moment');
var React = require('react');

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

  renderInactiveButtonClass: function(condition) {
    return condition ? " inactive" : "";
  },

  renderGrayedOut: function(shouldIRender, marginTop, marginLeft, borderRadius) {
    var grayedOutStyle = {
      position: 'absolute',
      zIndex: 100,
      backgroundColor: 'gray',
      opacity: 0.1,
      width: '100%',
      height: '100%',
      borderRadius: borderRadius || 0,
      marginTop: marginTop || 0,
      marginLeft: marginLeft || 0
    };
    if (shouldIRender) {
      return(
        React.createElement("div", {className: "grayed-out", style:  grayedOutStyle })
      );
    }
  },

  renderSpinner: function(shouldIRender, spinnerSize) {
    spinnerSize = spinnerSize || 90;
    var spinnerStyle = {
      position: 'absolute',
      backgroundImage: 'url(' + Images.spinner + ')',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.75,
      zIndex: 101,
      width: spinnerSize,
      height: spinnerSize,
      left: 'calc(50% - ' + (spinnerSize / 2) + 'px)',
      top: 'calc(50% - ' + (spinnerSize / 2) + 'px)'
    };
    if (shouldIRender) {
      return(
        React.createElement("div", {className: "spinner", style:  spinnerStyle })
      );
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
