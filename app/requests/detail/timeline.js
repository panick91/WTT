/**
 * Created by Patrick on 17.10.2015.
 */
angular.module('wtt.detailTimeline', ['ui.materialize','wtt.requestDetailService'])

    .controller('DetailTimelineCtrl', function ($scope, $state, $http, $stateParams, requestDetailService) {

        $scope.service = {};
        $scope.requestId = $stateParams.requestId;

        $scope.init = function ($state) {
            $scope.service = requestDetailService;
        }
        $scope.init();
    })
;

