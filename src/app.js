(() => {
  'use strict'

  angular
  .module('toDo', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'TodoController',
      templateUrl: 'templates/home.html'
    })
    .otherwise('/')
  })
})()
