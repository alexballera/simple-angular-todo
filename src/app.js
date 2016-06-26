import angular from 'angular'
import components from './components'
import routes from './config/routes'
// (() => {
//   'use strict'

  angular
  .module('App', [
    'App.components',
    'App.routes'
  ])

  angular.bootstrap(document.body, ['App'])
  // .filter('titleCase', titleCase)
  // function titleCase () {
  //   return function (text) {
  //     if (text != null) {
  //       return text.substring(0, 1).toUpperCase() + text.substring(1)
  //     }
  //   }
  // }
// })()
