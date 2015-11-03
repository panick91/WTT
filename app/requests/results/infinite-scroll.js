/**
 * Created by Patrick on 29.10.2015.
 */
'use strict';

angular.module('wtt.infinite-scroll', ['wtt.results'])

    .directive('infiniteScroll', function ($window, requestService) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {

                var end = $('html')[0];

                angular.element($window).bind('scroll', function () {

                    var window = angular.element($window);
                    if(window.height() + 100 > end.getBoundingClientRect().bottom && !requestService.loading){
                        requestService.loadFilteredRequests(requestService.requestData.next_page_url);
                    }
                });
            }
        }
    });
