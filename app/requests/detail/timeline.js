/**
 * Created by Patrick on 17.10.2015.
 */
angular.module('wtt.detailTimeline', ['ui.materialize', 'wtt.requestDetailService'])

    .controller('DetailTimelineCtrl', function ($scope, $state, $http, $stateParams, requestDetailService) {

        var graphWidth = 500;
        var availableWidth = 0;
        $scope.arrowWidth = 0;
        $scope.boxWidth = 0;

        $scope.service = {};

        $scope.init = function () {
            $scope.service = requestDetailService;
            $scope.service.addCallback($scope.calcWidths);
        };

        $scope.calcWidths = function () {
            availableWidth = graphWidth / $scope.service.requestData.availableMilestones.length;
            $scope.arrowWidth = availableWidth * 0.1;
            $scope.boxWidth = availableWidth * 0.8;
        };

        $scope.calcRectanglePosX = function (index) {
            return availableWidth * index;
        };

        $scope.calcArrowPosX1 = function (index) {
            return $scope.calcRectanglePosX(index) + $scope.boxWidth + $scope.arrowWidth * 0.25;
        };

        $scope.calcArrowPosX2 = function (index) {
            return $scope.calcRectanglePosX(index) + $scope.boxWidth + $scope.arrowWidth * 0.75;
        };

        $scope.isLastElement = function (index) {
            return (index == $scope.service.requestData.availableMilestones.length-1);
        };

        $scope.showSadDate = function(index){
            return !$scope.isMilestoneCompleted(index) && (index == $scope.service.requestData.availableMilestones.length-1);
        };

        $scope.isMilestoneCompleted = function(index){
            return $scope.service.requestData.currentWorkflowState.currentState >= index;
        };

        $scope.init();
    })
;

