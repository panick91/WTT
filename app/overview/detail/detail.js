/**
 * Created by Patrick on 23.08.2015.
 */
'use strict';

angular.module('wtt.detail', ['ngRoute', 'ui.materialize'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/overview', {
            templateUrl: 'detail/detail.html',
            controller: 'DetailCtrl'
        });
    }])

    .controller('DetailCtrl', function ($scope, $state, $http, $location) {

        $scope.requestData = [];

        $scope.init = function () {
            //$state.go('home.filter');

        }

        $scope.init();
    });