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
        requestService.loading = false;
        requestService.isEnd = false;

        requestService.loadRequests = function (url) {
            if(!requestService.isEnd) {
                requestService.loading = true;
                $http.get(url).success(function (data) {
                    requestService.requestData = data;
                    if (data != null) {

                        if(typeof(data.next_page_url) === typeof(undefined)) {
                            requestService.isEnd = true;
                        }

                        for (var index in requestService.requestData.data) {
                            var request = requestService.requestData.data[index];
                            if (request.sadDate !== null) {
                                request.sadDate.date = new Date(request.sadDate.date);
                            }
                            if (request.currentWorkflowState.currentState === -1) {
                                request.currentWorkflowState.stateText = "Not available";
                            } else {
                                request.currentWorkflowState.stateText = request.availableMilestones[request.currentWorkflowState.currentState];
                            }

                            requestService.requests.push(request);
                        }
                        requestService.loading = false;
                    }
                });
            }
        };

        return requestService;
    });