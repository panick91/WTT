/**
 * Created by Patrick on 23.08.2015.
 */
'use strict';

angular.module('wtt.detail', ['ui.materialize'])

    .controller('DetailCtrl', function ($scope, $state, $http, $stateParams) {

        $scope.requestData = [];

        $scope.requestId = $stateParams.requestId;

        $scope.init = function ($state) {
            $http.get('/api/1.0/orders/' + $scope.requestId).success(function (data) {
                if (data != null) {
                    $scope.requestData = data;
                    $scope.requestData.start_dt = new Date(data.start_dt);
                    $scope.requestData.end_dt = new Date(data.end_dt);
                }
            })
        };

        //

        $scope.init();
    });