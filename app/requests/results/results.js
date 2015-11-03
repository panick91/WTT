/**
 * Created by Patrick on 22.08.2015.
 */
'use strict';

var results = angular.module('wtt.results', ['wtt.requestService','wtt.infinite-scroll'])

    .controller('ResultsCtrl', function ($scope, $stateParams, requestService) {
        $scope.requestService = requestService;
        $scope.requests = requestService.requests;

        $scope.init = function () {
            requestService.empty();

            if($stateParams.serviceId !== undefined) requestService.addParam({key:'serviceId', value:$stateParams.serviceId});
            if($stateParams.customer !== undefined) requestService.addParam({key:'customer', value:$stateParams.customer});
            if($stateParams.siteId !== undefined) requestService.addParam({key:'siteId', value:$stateParams.siteId});
            if($stateParams.gvNumber !== undefined) requestService.addParam({key:'gvNumber', value:$stateParams.gvNumber});
            if($stateParams.status !== undefined) requestService.addParam({key:'status', value:$stateParams.status});
            requestService.loadFilteredRequests('/api/1.0/orders');
        };

        $scope.init();
    });