import angular from 'angular'
(() => {
  'use strict'

  angular
  .module('toDo', [])
  .controller('TodoController', TodoController)
  .filter('titleCase', titleCase)

  // .service('todoServices', todoServices)

  // function TodoController (todoServices) {
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
      angular.forEach(vm.todos, function (vm) {
        count += vm.done ? 0 : 1
      })
      return count
    }

    function archive () {
      var oldTodos = vm.todos
          // console.log(oldTodos)
      vm.todos = []
      angular.forEach(oldTodos, function (todo) {
        if (!todo.done) vm.todos.push(todo)
        // else vm.todos.push(oldTodos)
        console.log(todo)
        console.log(oldTodos)
      })
    }
  }

  // import titleCase from './directives/titleCase'

  function titleCase () {
    return function (text) {
      if (text != null) {
        return text.substring(0, 1).toUpperCase() + text.substring(1)
      }
    }
  }
})()
