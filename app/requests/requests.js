'use strict';

angular.module('wtt.requests', ['ui.materialize'])

    .controller('RequestsCtrl', function ($scope, $state, $http, $location) {

        $scope.projectStatus = [];

        $scope.$on('ngSelectRepeatFinished', function (ngRepeatFinishedEvent) {
            //$('[material-select]').material_select('destroy');
            $('[material-select]').material_select();
        });

        $scope.init = function () {
            $.get('/api/1.0/projectstatus').success(function(data){
                $scope.projectStatus = data;
            });
        };

        $scope.init();
    })
    .directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngSelectRepeatFinished');
                    });
                }
            }
        }
    });