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

  changeField: function(changeFieldArgs, event) {
    var key = event.target.dataset.field;
    var entity = event.target.dataset.entity;
    var saveKey;
    var saveValue;

    if (entity) {
      var newEntity = this.state[entity];
      newEntity[key] = event.target.value;
      saveKey = entity;
      saveValue = newEntity;
    } else {
      saveKey = key;
      saveValue = event.target.value;
    }

    module.exports.removeFieldError(changeFieldArgs.allErrors, changeFieldArgs.errorsArray, key);

    this.setState({
      [saveKey]: saveValue,
      justSaved: false
    }, function() {
      if (changeFieldArgs.changesFunction) {
        var changesToSave = changeFieldArgs.changesFunction.call();
        this.setState({
          changesToSave: changesToSave
        });
      }
    });
  },

  convertBooleanToTFString: function(boolean) {
    return boolean ? 't' : 'f';
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

  errorClass: function(stateErrors, fieldErrors) {
    var i;
    for (i = 0; i < fieldErrors.length; i++) {
      if (stateErrors.indexOf(fieldErrors[i]) > -1) {
        return 'error';
      }
    }
    return '';
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

  objectsAreEqual: function(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
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

  removeFieldError: function(errors, errorsArray, fieldName) {
    if (errors[fieldName]) {
      if (!errorsArray) {
        console.log("no errors array!!!");
      }
      errors[fieldName].forEach(function(message) {
        module.exports.removeFromArray(errorsArray, message);
      });
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

  renderDisabledButtonClass: function(condition) {
    return condition ? " disabled" : "";
  },

  renderFieldError: function(stateErrors, fieldErrors) {
    for (var i = 0; i < fieldErrors.length; i++) {
      if (stateErrors.indexOf(fieldErrors[i]) > -1) {
        return(
          React.createElement("div", { className: "yes-field-error" }, fieldErrors[i])
        );
      }
    }
    return(
      React.createElement("div", { className: "no-field-error" })
    );
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
      width: spinnerSize,
      height: spinnerSize,
      left: 'calc(50% - ' + (spinnerSize / 2) + 'px)',
      top: 'calc(50% - ' + (spinnerSize / 2) + 'px)'
    };
    if (shouldIRender) {
      return(
        React.createElement("div", { className: "spinner", style:  spinnerStyle })
      );
    }
  },

  setUpNiceSelect: function(obj) {
    var $dropDowns = $(obj.selector);
    if (!$dropDowns[0].nextSibling.classList.contains('nice-select')) {
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
