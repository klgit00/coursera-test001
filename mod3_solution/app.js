(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.directive('foundItems', FoundItemsDirective)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


// DDO 

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemList.html',
    scope: {
      itemList: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'ddoFoundCtrl',
    bindToController: true
  };

  return ddo;
}

// end of DDO


// DDO Controller

function FoundItemsDirectiveController() {
  var ddoFoundCtrl = this;   // set it up just in case

}

// end of DDO Controller


// NarrowItDownController section

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;
  console.log("NarrowItDownController start. ");
  ctrl.searchTerm = "";

  ctrl.narrowIt = function (searchItem) {
    console.log("ctrl.searchTerm=" + ctrl.searchTerm + " searchItem=" + searchItem);
	ctrl.foundItems = [];
	if (!searchItem) {
		ctrl.status = "Nothing found";
		return;
	}
	ctrl.status = "searching...";
	var promise = MenuSearchService.getMatchedMenuItems();

    promise.then(function (response) {
	  var menuItemList = response.data.menu_items;
   	  console.log("response menu_items.length=" + response.data.menu_items.length);
      for (var i = 0; i < menuItemList.length; i++) {
		var desc = menuItemList[i].description;
		console.log("menu_item i=" + i + " desc=" + desc);
		if (desc.toLowerCase().indexOf(searchItem.toLowerCase()) !== -1) {
			var item = {
				name: menuItemList[i].name,
				short_name: menuItemList[i].short_name,
				description: menuItemList[i].description
			};
			ctrl.foundItems.push(item);
			console.log("matched   i=" + i);
		}
	  }
	  if (ctrl.foundItems.length <= 0) {
		ctrl.status = "Nothing found";
	  }
	  console.log("found=" + ctrl.foundItems.length);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  ctrl.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    console.log("removing " + ctrl.foundItems[itemIndex].name);
    ctrl.foundItems.splice(itemIndex, 1);
  };
}

// end of NarrowItDownController


// menu search svc section

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    });
	
    return response;
  };

}

// end of menu search svc

})();
