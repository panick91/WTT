/**
 * Created by Patrick on 23.08.2015.
 */
'use strict';

angular.module('wtt.detail', ['ui.materialize'])

    .controller('DetailCtrl', function ($scope, $state, $http, $location) {

        $scope.requestData = [];

        $scope.init = function ($state) {
            //$state.go('home.filter');

        }

        $scope.init();
    });