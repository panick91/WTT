'use strict';

// Declare app level module which depends on views, and components
angular.module('wtt', [
    'ui.router',
    'ngAnimate',
    'wtt.requests',
    'wtt.detail',
    'wtt.results',
    'wtt.version',
    'wtt.deviations',
    'wtt.detailTimeline',
]).run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            //init();
        }
    ]
    )
    .config(['$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
            //$urlRouterProvider.otherwise('/requests');
            $stateProvider
                .state('requests', {
                    abstract: true,
                    url: '/requests?serviceId&customer&siteId&gvNumber&status',
                    templateUrl: 'requests/requests.html',
                    controller: 'RequestsCtrl'
                })
                .state('requests.results', {
                    url: '',
                    templateUrl: 'requests/results/results.html',
                    controller: 'ResultsCtrl'
                })
                .state('requests.details', {
                    url: '/{requestId:[0-9]*}',

                    views: {
                        '': {
                            templateUrl: 'requests/detail/detail.html',
                            controller: 'DetailCtrl',
                        },
                        'deviations@requests.details': {
                            templateUrl: 'requests/detail/deviations.html',
                            controller: 'DeviationsCtrl',
                        },
                        'timeline@requests.details': {
                            templateUrl: 'requests/detail/timeline.html',
                            controller: 'DetailTimelineCtrl',
                        }
                    }
                    //params: {
                    //    filter: 'test'
                    //}
                })
            //$locationProvider.html5Mode(true);
        }])

    .directive('toggleFilter', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                angular.element(element).bind('click', function (e) {
                    e.stopImmediatePropagation();
                    var target = angular.element(this).attr('data-activates');
                    angular.element('#' + target).toggleClass('open');

                    var unbind = angular.element($window).on('click', function (evt) {
                        if(evt.target.id == "filter")
                            return;
                        if($(evt.target).closest('#filter').length)
                            return;

                        angular.element('#' + target).removeClass('open');
                        angular.element($window).off('click');
                    });
                });

            }
        }
    });
;

(function ($) {
    $(function () {


    }); // end of document ready
})(jQuery); // end of jQuery name space