(function () {
  'use strict'

  angular
  .module('todo', [])
  .filter('titleCase', titleCase)

  function titleCase () {
    return function (text) {
      if (text != null) {
        return text.substring(0, 1).toUpperCase() + text.substring(1)
      }
    }
  }
})()
