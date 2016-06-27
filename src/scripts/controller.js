(() => {
  'use strict'

angular
.module('toDo')
.controller('TodoController', TodoController)

  function TodoController ($scope, localStorageService) {
    if (localStorageService.get('todolist')) {
      $scope.todo = localStorageService.get('todolist')
    } else {
      $scope.todo = []
    }
    $scope.$watchCollection('todo', function (newValue, oldValue) {
      localStorageService.set('todolist', $scope.todo)
    })
    // $scope.addTodo = addTodo
    // $scope.remaining = remaining
    // $scope.archive = archive

    $scope.addTodo = function () {
      if ($scope.newActv !== '') $scope.todo.push({text: $scope.newActv, done: false})
      $scope.newActv = ''
    }

    $scope.remaining = function () {
      var count = 0
      angular.forEach($scope.todo, function ($scope) {
        count += $scope.done ? 0 : 1
      })
      return count
    }

    $scope.archive = function () {
      var oldtodo = $scope.todo
      $scope.todo = []
      angular.forEach(oldtodo, function (todo) {
        if (!todo.done) $scope.todo.push(todo)
      })
    }

    $scope.showTodos = function () {
      var oldtodo = $scope.todo
      $scope.todo = []
      angular.forEach(oldtodo, function (todo) {
        if (todo.done) $scope.todo.push(todo)
      })
    }
    console.log($scope.todo)
  }
})()
