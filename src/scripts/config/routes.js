import angular from 'angular'
import ngRouter from 'angular-route'

// (() => {
//   'use strict'

  let routes = angular.module('App.routes', ['ngRoute'])

  routes.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'TodoController',
      templateUrl: 'scripts/components/tasks/controller.html'
    })
    .otherwise('/')
  })
// })()
export default routes
