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
        requestService.callbacks = [];

        requestService.loadRequest = function (url) {
            requestService.loading = true;
            $http.get(url).success(function (data) {
                requestService.loading = false;
                if (data != null) {
                    requestService.requestData = data;
                    requestService.requestData.start_dt = new Date(data.start_dt);
                    requestService.requestData.end_dt = new Date(data.end_dt);
                }
                for (var i = 0; i < requestService.callbacks.length; i++) {
                    requestService.callbacks[i]();
                }
            })
        };

        requestService.addCallback = function (callback) {
            if (callback !== undefined) requestService.callbacks.push(callback);
        };

        return requestService;
    });