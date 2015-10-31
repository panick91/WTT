/**
 * Created by Patrick on 23.08.2015.
 */
'use strict';

angular.module('wtt.detail', ['ui.materialize','wtt.requestDetailService'])

    .controller('DetailCtrl', function ($scope, $state, $http, $stateParams, requestDetailService) {

        $scope.service = requestDetailService;
        $scope.service.requestData = [];
        $scope.requestId = $stateParams.requestId;

        $scope.init = function () {
            requestDetailService.loadRequest('/api/1.0/orders/' + $scope.requestId);
        };

        $scope.init();
    });