import angular from 'angular'
// import uiRouter from 'angular-ui-router'

// let routes = angular.module('App.routes', ['ui.router'])

// routes.config(function($stateProvider, $urlRouterProvider) {
// 	$stateProvider
// 	.state('home' , {
// 		url: '/',
// 		controller: 'TodoController',
// 		templateUrl: 'components/tasks/controller.html'
// 	})
// 	$urlRouterProvider.otherwise('/')
// })
import ngRouter from 'angular-route'

  let routes = angular.module('App.routes', ['ngRoute'])

  routes.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'TodoController',
      templateUrl: 'components/tasks/controller.html'
    })
    .otherwise('/')
  })

export default routes
