/**
 * Created by Patrick on 22.08.2015.
 */
'use strict';

angular.module('wtt.navigation', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/filter', {
            templateUrl: 'filter/filter.html',
            controller: 'NavigationCtrl'
        });
    }])

    .controller('NavigationCtrl', function($scope,$http,$location) {
        $scope.requestData = [];

        $scope.init = function(){
            //$http.get('/api/requests').success(function(data){
            //    $scope.requestData=data;
            //});
            //alert('test');
        }

        $scope.init();
    });