'use strict';

angular.module('wtt.requests', ['ui.materialize'])

    .controller('RequestsCtrl', function ($scope, $state, $http, $location) {

        $scope.requestData = [];

        $scope.init = function () {
            //$state.go('home.filter');

        }

        $scope.init();
    });