var mkChartsModule = angular.module('mkCharts', [])
.directive("mkChart", function() {
  return {
    restrict: 'E',
    scope: {
      
      mkConfig: '=',
      mkDataSource: '=',
    },
    template: function(elem, attr){
      return '<mk-'+ attr.type +'></ mk-'+ attr.type +'>'; 
    },
    link: function(scope, elem, attr){
      console.log('chart');
    },
    controller: function($scope){
      $scope.type='mk-bar';
      console.log($scope.mkDataSource, $scope.mkConfig, $scope)
    }
  };
})
.directive("mkBar", function() {
  return {
    restrict: 'AE',
    require: '^^mkChart',
    template: 'hi',
    link: function(scope, elem, attr){
      console.log('bar', scope.type, scope.mkDataSource, scope.mkConfig);
    },
    controller: function($scope){
      //probably not needed
    }
  };
});
