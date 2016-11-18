(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuCatListController', MenuCatListController);


MenuCatListController.$inject = ['MenuCategoriesService', 'catData'];
function MenuCatListController(MenuCategoriesService, catData) {
  var menuCatCtrl = this;
  menuCatCtrl.catList = catData.data;
  console.log("in MenuCatListController ", menuCatCtrl.catList.length);
/*
  menuCatCtrl.itemList = [];
  
  var promise = MenuCategoriesService.getMenuCategories();

  promise.then(function (response) {
    console.log(response.data);
    //menu.categories = response.data;
	menuCatCtrl.catList = response.data;
	console.log('0', menuCatCtrl.catList[0].name)
	console.log('0', menuCatCtrl.catList[0].short_name)
  })
  .catch(function (error) {
    console.log("Something went terribly wrong in MenuCategoriesService.getMenuCategories.");
  });
*/  
/*
  menuCatCtrl.logMenuItems = function (index) {
	var shortName = menuCatCtrl.catList[index].short_name;
    menuCatCtrl.itemList = [];
    var promise = MenuCategoriesService.getMenuForCategory(shortName);

    promise.then(function (response) {
      console.log(response.data);
	  menuCatCtrl.itemList = response.data;
    })
    .catch(function (error) {
      console.log(error, ' in MenuCategoriesService.getMenuForCategory');
    })
  };
*/  
  
}

})();
