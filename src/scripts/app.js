(() => {
  'use strict'

  angular
  .module('toDo', ['ngRoute', 'LocalStorageModule'])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'TodoController',
      templateUrl: 'templates/home.html'
    })
    .otherwise('/')
  })
})()
