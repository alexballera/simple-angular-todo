(function () {
  'use strict'

  var app = angular.module('todo', [])
  app.controller('todoController', function () {
    var $scope = this
    $scope.todos = []

    $scope.addTodo = function () {
      if ($scope.todoText != '') $scope.todos.push({text: $scope.todoText, done: false})
      $scope.todoText = ''
    }

    $scope.remaining = function () {
      var count = 0
      angular.forEach($scope.todos, function (todo) {
        count += todo.done ? 0 : 1
      })
      return count
    }

    $scope.archive = function () {
      var oldTodos = $scope.todos
      $scope.todos = []
      angular.forEach(oldTodos, function (todo) {
        if (!todo.done) $scope.todos.push(todo)
      })
    }
  })

  app.filter('titleCase', function () {
    return function (text) {
      if (text != null) {
        return text.substring(0, 1).toUpperCase() + text.substring(1)
      }
    }
  })
})()
