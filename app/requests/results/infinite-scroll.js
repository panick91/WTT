/**
 * Created by Patrick on 29.10.2015.
 */
'use strict';

angular.module('wtt.infinite-scroll', ['wtt.results'])

    .directive('infiniteScroll', function ($window, requestService) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {

                var list = element[0];

                angular.element($window).bind('scroll', function () {

                    var window = angular.element($window);
                    if(window.scrollTop() + window.innerHeight() + 100 > list.scrollHeight){
                        requestService.loadRequests(requestService.requestData.next_page_url);
                    }

                    //
                    //console.log(window.scrollTop() + window.innerHeight());
                    //console.log(list.offsetHeight);
                    //console.log(list.scrollHeight);
                    //if (list.scrollTop + list.offsetHeight > list.scrollHeight) {
                    //    scope.$apply(attrs.scrolly);
                    //}
                });
            }
        }
    });
