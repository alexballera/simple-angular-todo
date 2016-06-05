angular.module('app', [])
.controller('todoController', function ($scope) {
  $scope.tasks = []
  $scope.addTask = function () {
    $scope.tasks.push($scope.task)
    $scope.task = ''
  }
})
