(() => {
  'use strict'

  // angular
  // .module('toDo', [
  //   'ngRoute',
  //   'LocalStorageModule',
  //   'toDo.controllers',
  //   'toDo.filters'
  // ])
  // .config(function ($routeProvider) {
  //   $routeProvider
  //   .when('/', {
  //     controller: 'TodoController',
  //     templateUrl: 'templates/home.html'
  //   })
  //   .otherwise('/')
  // })
  angular
  .module('todomvc', [
    'ngRoute'
    // 'todomvc.controllers',
    // 'todomvc.services'
    // 'todomvc.filters'
    ])
  .config(function ($routeProvider) {
    'use strict';

    var routeConfig = {
      controller: 'TodoCtrl',
      templateUrl: 'templates/home.html',
      resolve: {
        store: function (todoStorage) {
          return todoStorage.then(function (module) {
            module.get()
            return module
          });
        }
      }
    };

    $routeProvider
      .when('/', routeConfig)
      .when('/:status', routeConfig)
      .otherwise({
        redirectTo: '/'
      });
  });
})()
