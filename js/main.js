angular.module('todoApp', [])
.controller('todoController', function () {
  var todoList = this
  todoList.todos = []

  todoList.addTodo = function () {
    if (todoList.todoText != '') todoList.todos.push({text: todoList.todoText, done: false})
    todoList.todoText = ''
  }

  todoList.remaining = function () {
    var count = 0
    angular.forEach(todoList.todos, function (todo) {
      count += todo.done ? 0 : 1
    })
    return count
  }

  todoList.archive = function () {
    var oldTodos = todoList.todos
    todoList.todos = []
    angular.forEach(oldTodos, function (todo) {
      if (!todo.done) todoList.todos.push(todo)
    })
  }
})

.filter('titleCase', function () {
  return function (text) {
    if (text != null) {
      return text.substring(0, 1).toUpperCase() + text.substring(1)
    }
  }
})
