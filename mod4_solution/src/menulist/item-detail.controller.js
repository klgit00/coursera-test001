(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

// Version with resolving to 1 item based on $stateParams in route config
ItemDetailController.$inject = ['$stateParams', 'MenuCategoriesService', 'catData'];
function ItemDetailController($stateParams, MenuCategoriesService, catData) {
	var itemDetailCtrl = this;
	itemDetailCtrl.catList = catData.data;   // catData is not needed but we inherited it from parent view/state (categoryList)
	console.log('in ItemDetailController itemDetailCtrl.catList.length=', itemDetailCtrl.catList.length);
	/*
	var selectedCat = itemDetailCtrl.catList[$stateParams.itemIdx];
	console.log('in ItemDetailController selectedCat ', selectedCat, '   ', selectedCat.short_name);
	itemDetailCtrl.itemList = [];
	var shortName = selectedCat.short_name;
	*/
	var shortName = $stateParams.catShortName;    // short name is passed in url
	console.log('in ItemDetailController selected short_name=', shortName);
	itemDetailCtrl.itemList = [];
    var promise = MenuCategoriesService.getMenuForCategory(shortName);

    promise.then(function (response) {
      console.log(response.data);
	  itemDetailCtrl.itemList = response.data.menu_items;
	  console.log('in ItemDetailController itemDetailCtrl.itemList.length=', itemDetailCtrl.itemList.length);
    })
    .catch(function (error) {
      console.log(error, ' in MenuCategoriesService.getMenuForCategory');
    })
  
  
}

})();
