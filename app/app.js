'use strict';

// Declare app level module which depends on views, and components
angular.module('wtt', [
    'ui.router',
    'wtt.overview',
    'wtt.detail',
    'wtt.navigation',
    'wtt.version'
]).
    config(['$stateProvider', '$routeProvider', function ($stateProvider, $routeProvider) {
        $routeProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    'overview':{
                        templateUrl: 'overview/overview.html',
                        controller: 'OverviewCtrl',
                    },
                    'filter': {
                        templateUrl: 'filter/filter.html',
                        controller: 'NavigationCtrl'
                    }
                }
            })
            .state('detail', {
                url: '/detail',
                templateUrl: 'detail/detail.html',
                controller: 'DetailCtrl'
            })
    }]);