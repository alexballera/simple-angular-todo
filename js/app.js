(() => {
  'use strict'

  angular
  .module('toDo', [
    'ngRoute',
    'LocalStorageModule',
    'toDo.controllers',
    'toDo.filters'
  ])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'TodoController',
      templateUrl: 'templates/home.html'
    })
    .otherwise('/')
  })
})()
