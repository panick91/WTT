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
        }]);

(function($){
    $(function(){


    }); // end of document ready
})(jQuery); // end of jQuery name space