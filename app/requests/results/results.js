/**
 * Created by Patrick on 22.08.2015.
 */
'use strict';

var results = angular.module('wtt.results', ['wtt.requestService','wtt.infinite-scroll'])

    .controller('ResultsCtrl', function ($scope, requestService) {
        $scope.requestService = requestService;
        $scope.requests = requestService.requests;

        $scope.init = function () {
            requestService.loadRequests('/api/1.0/orders');
        };

        $scope.init();
    })