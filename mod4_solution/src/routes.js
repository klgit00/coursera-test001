(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menulist/templates/home.template.html'
  })

  // Category list page
  .state('categoryList', {
    url: '/category-list',
    templateUrl: 'src/menulist/templates/category-list.template.html',
    controller: 'MenuCatListController as menuCatCtrl',
    resolve: {
      catData: ['MenuCategoriesService', function (MenuCategoriesService) {
        return MenuCategoriesService.getMenuCategories();
      }]
    }
  })

  // Item detail list for a category
  .state('categoryList.itemDetail', {
    url: '/item-detail/{catShortName}',
    templateUrl: 'src/menulist/templates/item-detail.template.html',
    controller: 'ItemDetailController as itemDetailCtrl',
//    params: {
//      catShortName: null
//    }
  });

}

})();
