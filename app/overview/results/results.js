/**
 * Created by Patrick on 22.08.2015.
 */
'use strict';

angular.module('wtt.results', [])

    .controller('ResultsCtrl', function($scope,$http,$location) {
        $scope.requestData = [];

        $scope.init = function(){
            $http.get('/api/1.0/orders').success(function (data) {
                $scope.requestData = data;
            });
        }

        $scope.init();
    });