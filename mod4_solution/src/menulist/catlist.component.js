(function () {
'use strict';

angular.module('MenuApp')
.component('catList', {
  templateUrl: 'src/menulist/templates/catlistcomponent.template.html',
  bindings: {
    catList: '<'
  }
});

})();
