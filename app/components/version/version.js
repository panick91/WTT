'use strict';

angular.module('wtt.version', [
  'wtt.version.interpolate-filter',
  'wtt.version.version-directive'
])

.value('version', '0.1');
