'use strict';

angular.
  module('core.shopping-cart').
  factory('ShoppingCart', [
    function() {
      var storageKey = "sessionShoppingCart";

      function fetchAndUpdateData(data) {
        var resultData = {};
        var storedItem = sessionStorage.getItem(storageKey);
        if (storedItem && storedItem !== JSON.stringify({})) {
          resultData = JSON.parse(storedItem);
        }
        if (data && data.id) {
          delete resultData[data.id];
          resultData[data.id] = data;
        }
        return resultData;
      }

      function getObjectLength( object ) {
          var length = 0;
          for( var key in object ) {
              if( object.hasOwnProperty(key) ) {
                  ++length;
              }
          }
          return length;
      };

      function getUnpackedObjects( object ) {
        var result = [];
        for( var key in object ) {
            if( object.hasOwnProperty(key) ) {
              result.push(object[key]);
            }
        }
        return result;
      };

      function removeDataById(id) {
        var storedItem = sessionStorage.getItem(storageKey);
        storedItem = JSON.parse(storedItem);
        delete storedItem[id];
        sessionStorage.setItem(storageKey, JSON.stringify(storedItem));
      }

      function add(data) {
        var storedItem = fetchAndUpdateData(data);
        sessionStorage.setItem(storageKey, JSON.stringify(storedItem));
      }

      function remove(data) {
        if (data && data.id) {
          removeDataById(data.id);
        }
      }

      function removeAll() {
        sessionStorage.removeItem(storageKey);
      }

      function count() {
        return getObjectLength(fetchAndUpdateData());
      }

      function query() {
        return getUnpackedObjects(fetchAndUpdateData());
      }

      function checkOut() {
        removeAll();
      }

      return {
        add: add,
        remove: remove,
        removeAll: removeAll,
        count: count,
        query: query,
        checkOut: checkOut
      };
    }
  ]);
