/**
 * Created by Patrick on 29.10.2015.
 */
'use strict';

/*
 Shared service
 */
angular.module('wtt.requestService', [])

    .factory('requestService', function ($http) {

        var requestService = {};

        requestService.requests = [];
        requestService.params = [];
        requestService.loading = false;
        requestService.isEnd = false;

        requestService.empty = function () {
            requestService.requests.length = 0;
            requestService.isEnd = false;
            requestService.params.length = 0;
        };

        requestService.addParam = function (param) {
            requestService.params.push(param);
        };

        function getUrlWithParams(url) {
            var urlWithParams = url;

            for (var i in requestService.params) {
                if (requestService.params.hasOwnProperty(i)) {

                    var param = requestService.params[i];

                    if (urlWithParams.indexOf('?') > -1) {
                        urlWithParams += '&';
                    } else {
                        urlWithParams += '?';
                    }
                    urlWithParams += (param.key + '=' + param.value);
                }
            }

            return urlWithParams;
        };

        requestService.loadFilteredRequests = function (url) {
            if (!requestService.isEnd && !requestService.loading) {
                requestService.loading = true;
                $http.get(getUrlWithParams(url)).success(success);
            }
        };

        function success(data) {
            requestService.requestData = data;
            if (data != null) {

                if (data.next_page_url === undefined || data.next_page_url === null) {
                    requestService.isEnd = true;
                }

                for (var index in requestService.requestData.data) {
                    var request = requestService.requestData.data[index];
                    if (request.sadDate !== undefined) {
                        request.sadDate.date = new Date(request.sadDate.date);
                    }
                    if (request.currentWorkflowState === undefined) {
                        request.currentWorkflowState = {currentState: -1 };
                    }
                    if (request.currentWorkflowState.currentState === -1) {
                        request.currentWorkflowState.stateText = "Not available";
                    } else {
                        request.currentWorkflowState.stateText = request.availableMilestones[request.currentWorkflowState.currentState].longName;
                    }

                    requestService.requests.push(request);
                }
                requestService.loading = false;
            }
        }

        return requestService;
    });