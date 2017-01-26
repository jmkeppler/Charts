/*var url ="https://www.gstatic.com/charts/loader.js";
var JavaScript = {
  load: function(src, callback) {
    var existingScript = document.querySelector("script[src*='"+url+"']");
    if (!existingScript) {
      var script = document.createElement('script'),
          loaded;
      script.setAttribute('src', src);
      if (callback) {
        script.onreadystatechange = script.onload = function() {
          if (!loaded) {
            callback();
          }
          loaded = true;
        };
      }
      document.getElementsByTagName('head')[0].appendChild(script);
    }
    else{
      loaded = true;
      callback();
    }
  }
};

//Load google graphs if it's not already there, then bootstrap the app.
// The downside to this is that it forces any module that requires this to be 
JavaScript.load(url, function() {
  angular.element(function() {
      angular.bootstrap(document, ['Test']);
    });
});
*/

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
    template: '<div></div>',
    link: function(scope, elem, attr){
      console.log('bar', scope.type, scope.mkDataSource, scope.mkConfig);
      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      
      
      function drawChart(){
          // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1], 
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':500,
                       'height':300};

        var chart = new google.visualization.BarChart(elem[0]);
        chart.draw(data, options);
      }
    },
    controller: function($scope){
      //probably not needed
    }
  };
});
