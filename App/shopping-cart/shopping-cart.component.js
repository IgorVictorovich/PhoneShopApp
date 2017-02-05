'use strict';

angular.
  module('shoppingCart').
  component('shoppingCart', {
    templateUrl: 'shopping-cart/shopping-cart.template.html',
    controller: ['ShoppingCart',
      function ShoppingCartController(ShoppingCart) {
        this.phones = ShoppingCart.query();

        this.remove = function remove(data) {
          ShoppingCart.remove(data);
          this.phones = ShoppingCart.query();
        }

        this.getDetails = function getDetails(param) {
          if (param && param.id) {
            window.location.href = "#!/phones/"+param.id;
          }
        }
        this.backToPhonesList = function backToPhones() {
            window.location.href = "#!/phones";
        }

        this.removeAll = function removeAll() {
            ShoppingCart.removeAll();
            this.phones = ShoppingCart.query();
        }

        this.getTotalPrice = function getTotalPrice() {
            var phones = this.phones;
            var totalPrice = 0;
            phones.forEach(function(i){
              totalPrice+=i.price;
            });

            return totalPrice;
        }

        this.checkOut = function checkOut() {
          ShoppingCart.checkOut();
        }
      }
    ]
  });
