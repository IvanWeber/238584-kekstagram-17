'use strict';

(function () {
  window.utility = {

    getRandomInt: function (min, max) {
      var randomInt = Math.round(min + Math.random() * (max - min));
      return randomInt;
    },

    getRandomNElementsFromArray: function (numberOfElements, array) {
      var arrayClone = array.slice();
      var randomNElementsFromArray = [];
      for (var i = 0; i < numberOfElements; i++) {
        var randIndex = window.utility.getRandomInt(0, arrayClone.length - 1);
        randomNElementsFromArray[randomNElementsFromArray.length] = arrayClone[randIndex];
        arrayClone.splice(randIndex, 1);
      }
      return randomNElementsFromArray;
    },

    getSortedArrayByDescending: function (array) {
      var arrayClone = array.slice();
      arrayClone.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      return arrayClone;
    }

  };
})();
