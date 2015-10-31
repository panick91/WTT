/**
 * Created by Patrick on 17.10.2015.
 */
angular.module('wtt.deviations', ['ui.materialize'])

    .controller('DeviationsCtrl', function ($scope, $state, $http, $stateParams) {

        $scope.data = [];
        $scope.loading = true;

        $scope.requestId = $stateParams.requestId;
        $scope.initDeviationChart = function initDeviationChart() {
            var data = {
                labels: $scope.data['milestones'],
                series: [
                    $scope.data['deviations']
                ]
            };

            Array.prototype.max = function () {
                return Math.max.apply(null, this);
            };

            Array.prototype.min = function () {
                return Math.min.apply(null, this);
            };

            var options = {
                high: $scope.data['deviations'].max() + 2,
                low: $scope.data['deviations'].min() - 2,
                axisY: {
                    labelInterpolationFnc: function (value, index) {
                        return index % 2 === 0 ? value : null;
                    }
                }
            };

            var chart = new Chartist.Bar('#deviations', data, options);

            /* Register listener to draw event of Chartist, so we can dynamically color our bars based on their value*/
            chart.on('draw', function (context) {
                if (context.type === 'bar') {
                    if (Chartist.getMultiValue(context.value) < 0) {
                        context.element.attr({
                            style: 'stroke: red'
                        });
                    }
                }
            });
        };

        $scope.init = function ($state) {
            $http.get('/api/1.0/orders/' + $scope.requestId + '/deviations').success(function (data) {
                $scope.loading = false;
                if (data != null && data != "") {
                    $scope.data = data;
                    $scope.initDeviationChart();
                }
            })
        }
        $scope.init();
    })
;

