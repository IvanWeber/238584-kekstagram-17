'use strict';

(function () {

  var picDownloaded = document.querySelector('.img-upload');
  var commentary = picDownloaded.querySelector('.text__description');

  window.editFormTextFields = {

    initiateStopEventPropagationOnKeydownEscOnCommentary: function () {
      var commentaryElementKeydownEscHandler = function (evt) {
        if (evt.keyCode === window.constants.KeyCode.ESC) {
          evt.stopPropagation();
        }
      };
      commentary.addEventListener('keydown', commentaryElementKeydownEscHandler);
    },

    initiateCheckOnChangeElementOfForm: function (elementSelector, checks) {
      var element = picDownloaded.querySelector(elementSelector);
      element.setCustomValidity('');
      var commentaryElementChangeHandler = function () {
        element.setCustomValidity('');

        checks.forEach(function (check) {
          if (!check.checker(element.value)) {
            element.setCustomValidity(check.message);
            document.styleSheets[0].insertRule(elementSelector + ':invalid { border-color: red; }', 0);
          }
        });
      };
      element.removeEventListener('input', commentaryElementChangeHandler);
      element.addEventListener('input', commentaryElementChangeHandler);
    }

  };

})();
