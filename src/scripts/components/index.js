import angular from 'angular'

angular.module('App.components', [])

const components = angular.module('App.components')

require('./tasks/controller.js')(components)

export default components
