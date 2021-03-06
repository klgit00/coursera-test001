
(function () {
'use strict';

angular.module('LunchApp', [])
.controller('LunchController', LchController);

LchController.$inject = ['$scope'];
function LchController($scope) {
  $scope.items = [];
  $scope.lunchMsg = "";

  $scope.sayMessage = function () {
    var nbrItem = calculatNbrOfItems( $scope.items );
	alert("nbrItem=" + nbrItem);
    if (nbrItem <= 0) {
	  $scope.lunchMsg =  "Please enter data first";
	} else if (nbrItem <= 3) {
	  $scope.lunchMsg =  "Enjoy!";
	} else {
      $scope.lunchMsg = "Too much!";
	}
  };


  function calculatNbrOfItems(listOfItems) {
    var totalItem = listOfItems.length;
	for(var i = 0; i < listOfItems.length; i++) {
	  //if($scope.items[i] === "")
	  if( !listOfItems[i].trim() ) 
	  {
	    totalItem--;
	  }
    }
    return totalItem;
  }

}

})();


