'use strict';

angular.module('wtt.overview', ['ngRoute', 'ui.materialize'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/overview', {
            templateUrl: 'overview/overview.html',
            controller: 'OverviewCtrl'
        });
    }])

    .controller('OverviewCtrl', function ($scope, $state, $http, $location) {

        $scope.requestData = [];

        $scope.init = function () {
            //$state.go('home.filter');
            $http.get('/api/requests').success(function (data) {
                $scope.requestData = data;
            });
        }

        $scope.init();
    });