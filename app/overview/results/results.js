/**
 * Created by Patrick on 22.08.2015.
 */
'use strict';

angular.module('wtt.results', ['ngRoute'])

    .controller('ResultsCtrl', function($scope,$http,$location) {
        $scope.requestData = [];

        $scope.init = function(){
            $http.get('/api/requests').success(function (data) {
                $scope.requestData = data;
            });
        }

        $scope.init();
    });