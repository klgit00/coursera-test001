(function () {
'use strict';

angular.module('ShoppingListCheckOffApp', [])
.controller('ToBuyListController', ToBuyListController)
.controller('BoughtListController', BoughtListController)
.service('ShoppingListService', ShoppingListService);

// To Buy controller
ToBuyListController.$inject = ['ShoppingListService'];
function ToBuyListController(ShoppingListService) {
  var toBuyCtrl = this;

  // Initialize the list of items to buy
  ShoppingListService.addItemToBuy('Cookies',2);
  ShoppingListService.addItemToBuy('Chips',3);
  ShoppingListService.addItemToBuy('M & M',4);
  ShoppingListService.addItemToBuy('Gum',5);
  ShoppingListService.addItemToBuy('Coke',6);
  ShoppingListService.addItemToBuy('Pepsi',7);

  toBuyCtrl.getToBuyItemList = function () {
    return ShoppingListService.getItemsToBuy();
  }

  toBuyCtrl.buyingItem = function (itemIndex) {
    ShoppingListService.buyingItem(itemIndex);
  };
  
}


// Already Bought controller
BoughtListController.$inject = ['ShoppingListService'];
function BoughtListController(ShoppingListService) {
  var boughtCtrl = this;

  boughtCtrl.getBoughtItemList = function () {
    return ShoppingListService.getItemsBought();
  }

}


// Shopping List Svc. It has a list for items to buy and another list for items bought.
function ShoppingListService() {
  var service = this;

  // List of shopping items to buy
  var itemsToBuy = [];
  // List of shopping items already bought
  var itemsBought = [];

  // managing list of item to buy
  
  service.addItemToBuy = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    itemsToBuy.push(item);
  };

  service.removeItemToBuy = function (itemIndex) {
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };
  
  // Managing list of item bought

  service.addItemBought = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    itemsBought.push(item);
  };

  service.removeItemBought = function (itemIndex) {
    itemsBought.splice(itemIndex, 1);
  };

  service.getItemsBought = function () {
    return itemsBought;
  };
  
  // coordinating the 2 lists
  
  service.buyingItem = function (itemIndex) {
    itemsBought.push(itemsToBuy[itemIndex]);
    itemsToBuy.splice(itemIndex, 1);
  };

}


})();
