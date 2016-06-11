(function () {
  'use strict'

  angular
  .module('todo', [])
  .controller('todoController', todoController)
  .filter('titleCase', titleCase)

  function todoController () {
    var vm = this

    vm.todos = []
    vm.addTodo = addTodo
    vm.remaining = remaining
    vm.archive = archive

    function addTodo () {
      if (vm.todoText != '') vm.todos.push({text: vm.todoText, done: false})
      vm.todoText = ''
    }

    function remaining () {
      var count = 0
      angular.forEach(vmvm.todos, function (todo) {
        count += vmvm.done ? 0 : 1
      })
      return count
    }

    function archive () {
      var oldTodos = vm.todos
      vm.todos = []
      angular.forEach(oldTodos, function (todo) {
        if (!todo.done) vm.todos.push(vm)
      })
    }
  }

  function titleCase () {
    return function (text) {
      if (text != null) {
        return text.substring(0, 1).toUpperCase() + text.substring(1)
      }
    }
  }
})()
