/**
 * Created by Patrick on 22.08.2015.
 */
'use strict';

angular.module('wtt.filter', [])

    .controller('FilterCtrl', function($scope,$http,$location) {
        $scope.requestData = [];

        $scope.init = function(){
            //$http.get('/api/requests').success(function(data){
            //    $scope.requestData=data;
            //});
            //alert('test');
        }

        $scope.init();
    });