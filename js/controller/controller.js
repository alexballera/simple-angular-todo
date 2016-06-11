(function () {
  'use strict'

   angular
  .module('todo', [])
  .controller('TodoController', TodoController)
  // .service('todoServices', todoServices)

  // function todoController (todoServices) {
  //   this.todos = todoServices.getData()
  // }

  // function todoServices () {
  //   return {
  //     getData: getData
  //   }
  // }

  // function getData () {

  function TodoController () {
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
      angular.forEach(vm.todos, function (todo) {
        count += vm.done ? 0 : 1
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
})()
