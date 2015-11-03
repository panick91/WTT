'use strict';

angular.module('wtt.requests', ['ui.materialize', 'wtt.requestService'])

    .controller('RequestsCtrl', function ($scope, $state, $http, $stateParams) {

        $scope.projectStatus = [
            {key: '-1', name: 'Choose a project status', longName: 'Choose an option'}
        ];

        $scope.serviceId = $stateParams.serviceId !== undefined ? $stateParams.serviceId : "";
        $scope.customer = $stateParams.customer !== undefined ? $stateParams.customer : "";
        $scope.siteId = $stateParams.siteId !== undefined ? $stateParams.siteId : "";
        $scope.gvNumber = $stateParams.gvNumber !== undefined ? $stateParams.gvNumber : "";
        $scope.status = {}; //needs to stay empty in order to trigger changed event after data load

        $scope.init = function () {
            $.get('/api/1.0/projectstatus').success(function (data) {
                if (data !== undefined) {
                    for (var i in data) {
                        $scope.projectStatus.push(data[i]);
                    }

                    var index = parseInt($stateParams.status);
                    if (index !== undefined && index !== NaN && index >= 0 && index < $scope.projectStatus.length) {
                        $scope.status = $scope.projectStatus[index + 1];
                    } else {
                        // Choose default
                        $scope.status = $scope.projectStatus[0];
                    }
                }
            });
        };

        $scope.submit = function () {
            var filter = {};

            if ($scope.serviceId !== "") filter.serviceId = $scope.serviceId;
            if ($scope.customer !== "") filter.customer = $scope.customer;
            if ($scope.siteId !== "") filter.siteId = $scope.siteId;
            if ($scope.gvNumber !== "") filter.gvNumber = $scope.gvNumber;
            if ($scope.status !== {} && $scope.status.key != -1) filter.status = $scope.status.key;

            $state.go('requests.results', filter, {inherit: false, reload: true});
        };

        $scope.init();
    })
    .directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(attrs.ngModel, function () {
                    $timeout(function () {
                        $('#status').material_select();
                    });
                });
            }
        }
    });