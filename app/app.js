'use strict';

// Declare app level module which depends on views, and components
angular.module('wtt', [
    'ui.router',
    'wtt.overview',
    'wtt.detail',
    'wtt.filter',
    'wtt.results',
    'wtt.version'
]).
    config(['$stateProvider', '$routeProvider', function ($stateProvider, $routeProvider) {
        $routeProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                views:{
                    '':{
                        templateUrl:'overview/overview.html',
                        controller: 'OverviewCtrl'
                    },
                    'filter@home':{
                        templateUrl:'overview/filter/filter.html',
                        controller: 'FilterCtrl'
                    },
                    'results@home':{
                        templateUrl:'overview/results/results.html',
                        controller: 'ResultsCtrl'
                    }
                }

            })
            .state('detail', {
                url: '/detail',
                templateUrl: 'detail/detail.html',
                controller: 'DetailCtrl'
            })
    }]);