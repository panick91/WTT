/**
 * Created by Patrick on 22.08.2015.
 */
'use strict';

var results = angular.module('wtt.results', ['wtt.requestService', 'wtt.infinite-scroll'])

    .controller('ResultsCtrl', function ($scope, $stateParams, requestService) {
        var graphWidth = 150;
        var availableWidth = 0;

        $scope.requestService = requestService;
        $scope.requests = requestService.requests;

        $scope.init = function () {
            requestService.empty();

            if ($stateParams.serviceId !== undefined) requestService.addParam({
                key: 'serviceId',
                value: $stateParams.serviceId
            });
            if ($stateParams.customer !== undefined) requestService.addParam({
                key: 'customer',
                value: $stateParams.customer
            });
            if ($stateParams.siteId !== undefined) requestService.addParam({key: 'siteId', value: $stateParams.siteId});
            if ($stateParams.gvNumber !== undefined) requestService.addParam({
                key: 'gvNumber',
                value: $stateParams.gvNumber
            });
            if ($stateParams.status !== undefined) requestService.addParam({key: 'status', value: $stateParams.status});
            requestService.loadFilteredRequests('/api/1.0/orders');
        };

        $scope.calcMilestonePosX = function (index, totalLength) {
            if (totalLength <= 1) return 0;
            return (graphWidth - 15) / (totalLength - 1) * index;
        };

        $scope.calcLinePosX1 = function (index, totalLength) {
            var milestonePosX = $scope.calcMilestonePosX(index, totalLength);
            return milestonePosX + 17;
        };

        $scope.calcLinePosX2 = function (index, totalLength) {
            var milestonePosX = $scope.calcMilestonePosX(index + 1, totalLength);
            return milestonePosX - 5;
        };

        $scope.isMilestoneCompleted = function (index, request) {
            return request.currentWorkflowState.currentState >= index;
        };

        $scope.isWorking = function (index, request) {
            return $scope.isMilestoneCompleted(index - 1, request);
        };

        $scope.init();
    });