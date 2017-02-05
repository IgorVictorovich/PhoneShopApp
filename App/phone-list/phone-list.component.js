'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['Phone', 'ShoppingCart',
        function PhoneListController(Phone, ShoppingCart) {
          var storageKey = "sessionShoppingCart";
          this.phones = Phone.query();
          this.orderProp = 'age';

          this.getDetails = function getDetails(param) {
            if (param && param.id) {
              window.location.href = "#!/phones/"+param.id;
            }
          }

          this.routeToCart = function routeToCart() {
            window.location.href = "#!/cart";
          }

          this.addToShoppingCart = function addToShoppingCart(phoneItem) {
            ShoppingCart.add(phoneItem);
          }

          this.countItemsInShoppingCart = function countItemsInShoppingCart() {
            return ShoppingCart.count();
          }

        }
    ]
  });
