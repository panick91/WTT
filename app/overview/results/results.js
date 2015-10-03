/**
 * Created by Patrick on 22.08.2015.
 */
'use strict';

angular.module('wtt.results', [])

    .controller('ResultsCtrl', function($scope,$http,$location,$state) {
        $scope.requestData = [];

        $scope.init = function(){
            $http.get('/api/1.0/orders').success(function (data) {
                $scope.requestData = data;
            });
        }

        $scope.init();
    })
    .controller('AppCtrl', ["$scope","$state", function ($scope,$state) {
        // Standard Ansicht Definieren
        $scope.moduleState = 'list';
        // ShowDetail Funktion
        $scope.showDetail = function (data) {
            $scope.moduleData = data;
            $scope.moduleState = 'details';
            $state.go("detail");
        };

        // ListView Funktion (Zurück Button)
        $scope.showList = function (data) {
            $scope.modulData = data;
            $scope.moduleState = 'list';
            $state.go("home");

        }}]);