/**
 * Created by Patrick on 29.10.2015.
 */
'use strict';

/*
 Shared service
 */
angular.module('wtt.requestDetailService', [])

    .factory('requestDetailService', function ($http) {

        var requestService = {};

        requestService.requestData = [];
        requestService.loading = false;

        requestService.loadRequest = function (url) {
            requestService.loading = true;
            $http.get(url).success(function (data) {
                requestService.loading = false;
                if (data != null) {
                    requestService.requestData = data;
                    requestService.requestData.start_dt = new Date(data.start_dt);
                    requestService.requestData.end_dt = new Date(data.end_dt);
                }
            })
        };

        return requestService;
    });