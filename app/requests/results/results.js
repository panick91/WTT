/**
 * Created by Patrick on 22.08.2015.
 */
'use strict';

angular.module('wtt.results', [])

    .controller('ResultsCtrl', function ($scope, $http, $location, $state) {
        $scope.requestData = [];
        $scope.requests = [];

        $scope.init = function () {
            $scope.loadRequests('/api/1.0/orders');
        }

        $scope.loadRequests = function (url) {
            $http.get(url).success(function (data) {
                $scope.requestData = data;

                if (data != null) {
                    $scope.requests.push(data.data);

                    for (var index in $scope.requestData.data) {
                        var request = $scope.requestData.data[index];
                        if (request.sadDate !== null) {
                            request.sadDate.date = new Date(request.sadDate.date);
                        }
                        if (request.currentWorkflowState.currentState === -1) {
                            request.currentWorkflowState.stateText = "Not available";
                        } else {
                            request.currentWorkflowState.stateText = request.availableMilestones[request.currentWorkflowState.currentState];
                        }
                    }
                }
            });
        }

        $scope.loadMoreRequests = function(){
            $scope.loadRequests($scope.requestData.next_page_url);
        }

        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            Materialize.showStaggeredList('#results');
        });

        var options = [
            {selector: '#test', offset: -400, callback: function(){
                $scope.loadRequests($scope.requestData.next_page_url);
            }}
        ];

        Materialize.scrollFire(options);

        $scope.init();
    })

    .directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    });