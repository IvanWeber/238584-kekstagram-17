'use strict';

(function () {
  window.checks = {

    textareaChecks: [{
      checker: function (value) {
        return value.length < window.constants.Validation.MESSAGE_MAX_LENGTH;
      },
      message: 'Длина сообщения должна быть меньше 140 символов',
    }
    ],

    hashtagsChecks: [
      {
        checker: function (value) {
          return value.length < window.constants.Validation.MESSAGE_MAX_LENGTH;
        },
        message: 'Длина сообщения должна быть меньше 140 символов',
      },
      {
        checker: function (value) {
          var valueArray = value.split('');
          return valueArray[0] === '#';
        },
        message: 'Поле должно начинаться с символа #'
      },
      {
        checker: function (value) {
          var valueArray = value.split('');
          for (var i = 0; i < valueArray.length; i++) {
            if (valueArray[i] === ' ' && valueArray[i + 1] !== '#') {
              return false;
            }
          }
          return true;
        },
        message: 'Каждый новый хэш-тег после пробела должен начинаться с символа #'
      },
      {
        checker: function (value) {
          var valueArray = value.split('');
          for (var i = 0; i < valueArray.length; i++) {
            if (valueArray[i] === '#' && valueArray[i + 1] === ' ' || valueArray[i] === '#' && valueArray[i + 1] === undefined) {
              return false;
            }
          }
          return true;
        },
        message: 'Хэш-тег не может состоять только из одной решётки'
      },
      {
        checker: function (value) {
          var valueArray = value.split('');
          for (var i = 0; i < valueArray.length; i++) {
            if (valueArray[i - 1] !== undefined && valueArray[i - 1] !== ' ' && valueArray[i] === '#') {
              return false;
            }
          }
          return true;
        },
        message: 'Хэш-теги разделяются пробелами'
      },
      {
        checker: function (value) {
          var valueArray = value.split('');
          for (var i = 0; i < valueArray.length; i++) {
            valueArray[i] = valueArray[i].toLowerCase();
          }
          var newValue = valueArray.join('');
          valueArray = newValue.split(' ');
          for (var j = 0; j < valueArray.length; j++) {
            for (var k = 0; k < valueArray.length; k++) {
              if (valueArray[j] === valueArray[k] && j !== k) {
                return false;
              }
            }
          }
          return true;
        },
        message: 'Один и тот же хэш-тег не может быть использован дважды. Теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом'
      },
      {
        checker: function (value) {
          var valueArray = value.split(' ');
          var isInvalid = valueArray.length > window.constants.Validation.MAX_NUMBER_OF_HASHTAGS;
          return isInvalid ? false : true;
        },
        message: 'Нельзя указать больше пяти хэш-тегов'
      },
      {
        checker: function (value) {
          var hashtagsArray = value.split(' ');
          for (var i = 0; i < hashtagsArray.length; i++) {
            if (hashtagsArray[i].split('').length > window.constants.Validation.MAX_CHARS_OF_HASHTAG) {
              return false;
            }
          }
          return true;
        },
        message: 'Максимальная длина одного хэш-тега 20 символов, включая решётку'
      }
    ]

  };
})();
