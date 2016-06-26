import angular from 'angular'
// (() => {
//   'use strict'

export default function (ngComponent) {
  ngComponent.controller('TodoController', TodoController)

  function TodoController ($scope) {
    // var $scope = this

    $scope.todos = []
    // $scope.addTodo = addTodo
    // $scope.remaining = remaining
    // $scope.archive = archive

    $scope.addTodo = function () {
      if ($scope.todoText !== '') $scope.todos.push({text: $scope.todoText, done: false})
      $scope.todoText = ''
    }

    $scope.remaining = function () {
      var count = 0
      angular.forEach($scope.todos, function ($scope) {
        count += $scope.done ? 0 : 1
      })
      return count
    }

    $scope.archive = function () {
      var oldTodos = $scope.todos
          // console.log(oldTodos)
      $scope.todos = []
      angular.forEach(oldTodos, function (todo) {
        if (!todo.done) $scope.todos.push(todo)
        // else $scope.todos.push(oldTodos)
        console.log(todo)
        console.log(oldTodos)
      })
    }
  }
}
// })()
