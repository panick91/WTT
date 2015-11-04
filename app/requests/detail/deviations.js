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

            var $chart = $('#deviations');

            var $toolTip = $chart
                .append('<div class="tooltip"></div>')
                .find('.tooltip')
                .hide();

            function getTooltipText(value){
                var text = "";
                if(value < 0) text = "Days behind" + "<br/>" + value;
                else text = "Days in advance" + "<br/>" + value;
                return text;
            }

            $chart.on('mouseenter', '.ct-bar', function() {
                var $point = $(this),
                    value = $point.attr('ct:value')
                $toolTip.html(getTooltipText(value)).show();
            });

            $chart.on('mouseleave', '.ct-bar', function() {
                $toolTip.hide();
            });

            $chart.on('mousemove', function(event) {
                $toolTip.css({
                    left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
                    top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
                });
            });

            /* Register listener to draw event of Chartist, so we can dynamically color our bars based on their value*/
            chart.on('draw', function (context) {
                if (context.type === 'bar') {
                    if (Chartist.getMultiValue(context.value) < 0) {
                        context.element.attr({
                            style: 'stroke: #F44336'
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

