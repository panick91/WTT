'use strict';

angular.module('wtt.overview', ['ui.materialize'])

    .controller('OverviewCtrl', function ($scope, $state, $http, $location) {

        $scope.requestData = [];

        $scope.init = function () {
            //$state.go('home.filter');

        }

        $scope.init();
    });