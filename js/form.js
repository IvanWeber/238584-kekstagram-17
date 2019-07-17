'use strict';
(function () {
  var closeEditFormOnKeydownEscAndOnClickCloseButton = function () {
  // OnKeydownEsc
    var editForm = document.querySelector('.img-upload__overlay');
    var editFormEscKeydownHandler = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEY_CODE) {
        editForm.classList.add('hidden');
        var uploadForm = document.querySelector('.img-upload__form');
        uploadForm.reset();
        document.removeEventListener('keydown', editFormEscKeydownHandler);
      }
    };
    document.addEventListener('keydown', editFormEscKeydownHandler);

    // OnClickCloseButton
    var closeButton = document.querySelector('.img-upload__cancel');
    var closeButtonClickHandler = function () {
      var editFormElement = document.querySelector('.img-upload__overlay');
      editFormElement.classList.add('hidden');
      var uploadForm = document.querySelector('.img-upload__form');
      uploadForm.reset();
      document.removeEventListener('keydown', editFormEscKeydownHandler);
    };
    closeButton.addEventListener('click', closeButtonClickHandler);

    // ButNotIfFocusOnInputField
    var hashTagsInput = document.querySelector('.text__hashtags');
    var descriptionInput = document.querySelector('.text__description');
    var hashTagsInputEscKeydownHandler = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEY_CODE) {
        evt.stopPropagation();
      }
    };
    var descriptionInputInputEscKeydownHandler = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEY_CODE) {
        evt.stopPropagation();
      }
    };
    hashTagsInput.addEventListener('keydown', hashTagsInputEscKeydownHandler);
    descriptionInput.addEventListener('keydown', descriptionInputInputEscKeydownHandler);
  };

  var openEditFormOnDownloadPic = function () {
    var inputElement = document.querySelector('.img-upload__input');
    var pictureInputChangeHandler = function () {
      var editFormElement = document.querySelector('.img-upload__overlay');
      editFormElement.classList.remove('hidden');
      closeEditFormOnKeydownEscAndOnClickCloseButton();
    };
    inputElement.addEventListener('change', pictureInputChangeHandler);
  };

  function buildEffectStyle(effect, filterValueInput) {
    return effect.FILTER + '(' + filterValueInput * effect.MAX / window.constants.STEPS_COUNT + effect.UNITS + ')';
  }

  var changeFilterIntensityOnMouseUp = function () {
    var imgUploadPreview = document.querySelector('.img-upload__preview');
    var sliderPin = document.querySelector('.effect-level__pin');
    var filterValueInput = document.querySelector('.effect-level__value');
    var sliderPinMouseUpHandler = function () {
      filterValueInput.value = window.constants.FILTER_VALUE_INPUT_TEST;
      var effectKey = imgUploadPreview.classList[1];
      imgUploadPreview.style.filter = buildEffectStyle(window.constants.EFFECTS[effectKey], filterValueInput.value);
    };
    sliderPin.addEventListener('mouseup', sliderPinMouseUpHandler);
  };

  var changeFilterOnChangeFilterRadioButton = function () {
    var radioButtons = document.querySelector('.effects__list').cloneNode(true);
    var radioButtonChangeHandler = function (evt) {

      var levelPin = document.querySelector('.effect-level__pin');
      var levelDepth = document.querySelector('.effect-level__depth');
      levelPin.style.left = window.constants.LEVEL_PIN_MAX_LEFT + 'px';
      levelDepth.style.width = window.constants.LEVEL_PIN_MAX_LEFT + 'px';

      var imgUploadPreview = document.querySelector('.img-upload__preview');
      imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
      imgUploadPreview.classList.add(evt.currentTarget.id);

      var slider = document.querySelector('.img-upload__effect-level');
      var filterValueInput = document.querySelector('.effect-level__value');

      if (evt.currentTarget.id === 'effect-none') {
        slider.classList.add('hidden');
        imgUploadPreview.style.filter = 'none';
      } else {
        slider.classList.remove('hidden');
        filterValueInput.value = window.constants.FILTER_VALUE_INPUT_MAX;
        imgUploadPreview.style.filter = buildEffectStyle(window.constants.EFFECTS[evt.currentTarget.id], filterValueInput.value);
      }
    };
    for (var i = 1; i <= radioButtons.childElementCount; i++) {
      var radioButton = document.querySelector('.effects__item:nth-child(' + i + ')').querySelector('.effects__radio');
      radioButton.addEventListener('change', radioButtonChangeHandler);
    }
  };

  var stopEventPropagationOnKeydownEscOnCommentary = function () {
    var commentaryElement = document.querySelector('.text__description');
    var commentaryElementKeydownEscHandler = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEY_CODE) {
        evt.stopPropagation();
      }
    };
    commentaryElement.addEventListener('keydown', commentaryElementKeydownEscHandler);
  };

  var TextareaChecks = [{
    checker: function (value) {
      return value.length < 140;
    },
    message: 'Длина сообщения должна быть меньше 140 символов',
  }
  ];

  var HashtagsChecks = [
    {
      checker: function (value) {
        return value.length < 140;
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
        if (valueArray.length > 5) {
          return false;
        }
        return true;
      },
      message: 'Нельзя указать больше пяти хэш-тегов'
    },
    {
      checker: function (value) {
        var hashtagsArray = value.split(' ');
        for (var i = 0; i < hashtagsArray.length; i++) {
          if (hashtagsArray[i].split('').length > 20) {
            return false;
          }
        }
        return true;
      },
      message: 'Максимальная длина одного хэш-тега 20 символов, включая решётку'
    }
  ];

  var initiateCheckOnChangeElementOfForm = function (elementSelector, checks) {
    var element = document.querySelector(elementSelector);
    var commentaryElementChangeHandler = function () {
      element.setCustomValidity('');
      for (var i = 0; i < checks.length; i++) {
        if (!checks[i].checker(element.value)) {
          element.setCustomValidity(checks[i].message);
          document.styleSheets[0].insertRule(elementSelector + ':invalid { border-color: red; }', 0);
        }
      }
    };
    element.addEventListener('input', commentaryElementChangeHandler);
  };

  var initiateLevelPinDrugAndDrop = function (levelPinSelector, levelOuterBarSelector, levelDepthSelector, elementToBeProcessedSelector, intensityInputSelector) {
    var levelPin = document.querySelector(levelPinSelector);
    var levelOuterLine = document.querySelector(levelOuterBarSelector);
    var levelDepth = document.querySelector(levelDepthSelector);

    var elementToBeProcessed = document.querySelector(elementToBeProcessedSelector);

    var movePin = function (evt) {
      evt.preventDefault();

      var rect = levelOuterLine.getBoundingClientRect();

      var shift = {
        x: evt.clientX - rect.x
      };

      var shiftX = shift.x - window.constants.GAP_BETWEEN_INSIDE_AND_OUTSIDE_BARS;

      if (shiftX < 0) {
        shiftX = 0;
      }
      if (shiftX > window.constants.LEVEL_PIN_MAX_LEFT) {
        shiftX = window.constants.LEVEL_PIN_MAX_LEFT;
      }

      levelPin.style.left = shiftX + 'px';

      levelDepth.style.width = shiftX + 'px';

      var intensityInput = document.querySelector(intensityInputSelector);

      intensityInput.value = Math.round(getValueOfLevelPin(levelPinSelector));

      elementToBeProcessed.style.filter = buildEffectStyle(window.constants.EFFECTS[elementToBeProcessed.classList[1]], intensityInput.value);
    };

    var effectLevelLineMousedownHandler = function (evt) {
      movePin(evt);

      var onMouseMove = function (moveEvt) {
        movePin(moveEvt);
      };

      var onMouseUp = function (upEvt) {
        movePin(upEvt);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
    levelOuterLine.addEventListener('mousedown', effectLevelLineMousedownHandler);
  };

  var getValueOfLevelPin = function (levelPinSelector) {
    var levelPin = document.querySelector(levelPinSelector);
    var valueOfLevelPin = levelPin.style.left.substring(0, levelPin.style.left.length - 2) * window.constants.FILTER_VALUE_INPUT_MAX / window.constants.LEVEL_PIN_MAX_LEFT;
    return valueOfLevelPin;
  };

  var onSuccessPost = function () {

    var editForm = document.querySelector('.img-upload__overlay');
    editForm.classList.add('hidden');

    var template = document.querySelector('#success').cloneNode(true);
    var successSection = template.content.querySelector('.success').cloneNode(true);
    var main = document.querySelector('main');
    main.insertBefore(successSection, main.firstChild);
    var successButton = main.querySelector('.success__button');

    var successButtonClickHandler = function () {
      main.removeChild(successSection);
      var uploadForm = document.querySelector('.img-upload__form');
      uploadForm.reset();
      successButton.removeEventListener('click', successButtonClickHandler);
      document.removeEventListener('keydown', successSectionKeydownEscHandler);
      document.removeEventListener('click', successSectionOutClickHandler);
    };

    var successSectionKeydownEscHandler = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEY_CODE) {
        main.removeChild(successSection);
        var uploadForm = document.querySelector('.img-upload__form');
        uploadForm.reset();
        successButton.removeEventListener('click', successButtonClickHandler);
        document.removeEventListener('keydown', successSectionKeydownEscHandler);
        document.removeEventListener('click', successSectionOutClickHandler);
      }
    };

    var successSectionOutClickHandler = function (evt) {
      if (document.querySelector('.success__inner') !== null && !document.querySelector('.success__inner') !== undefined) {
        if (!document.querySelector('.success__inner').contains(evt.target)) {
          successButton.removeEventListener('click', successButtonClickHandler);
          document.removeEventListener('keydown', successSectionKeydownEscHandler);
          document.removeEventListener('click', successSectionOutClickHandler);
          main.removeChild(successSection);
          var uploadForm = document.querySelector('.img-upload__form');
          uploadForm.reset();
        }
      }
    };

    successButton.addEventListener('click', successButtonClickHandler);
    document.addEventListener('keydown', successSectionKeydownEscHandler);
    document.addEventListener('click', successSectionOutClickHandler);
  };

  var onErrorPost = function () {

    var editForm = document.querySelector('.img-upload__overlay');
    editForm.classList.add('hidden');

    var template = document.querySelector('#error').cloneNode(true);
    var errorSection = template.content.querySelector('.error').cloneNode(true);
    var main = document.querySelector('main');
    main.insertBefore(errorSection, main.firstChild);
    var tryAgainButton = main.querySelectorAll('.error__button')[0];
    var uploadAnotherFileButton = main.querySelectorAll('.error__button')[1];

    var tryAgainButtonClickHandler = function () {
      main.removeChild(errorSection);
      window.postLoad('https://js.dump.academy/kekstagram', onSuccessPost, onErrorPost);
    };

    var uploadAnotherFileButtonClickHandler = function () {
      main.removeChild(errorSection);
      var uploadForm = document.querySelector('.img-upload__form');
      uploadForm.reset();
      document.querySelector('.img-upload__control').click();
    };

    var errorSectionKeydownEscHandler = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEY_CODE) {
        main.removeChild(errorSection);
        var uploadForm = document.querySelector('.img-upload__form');
        uploadForm.reset();
        document.removeEventListener('keydown', errorSectionKeydownEscHandler);
        document.removeEventListener('click', errorSectionOutClickHandler);
      }
    };

    var errorSectionOutClickHandler = function (evt) {
      if (document.querySelector('.error__inner') !== null && !document.querySelector('.error__inner') !== undefined) {
        if (!document.querySelector('.error__inner').contains(evt.target)) {
          document.removeEventListener('keydown', errorSectionKeydownEscHandler);
          document.removeEventListener('click', errorSectionOutClickHandler);
          main.removeChild(errorSection);
          var uploadForm = document.querySelector('.img-upload__form');
          uploadForm.reset();
        }
      }
    };

    tryAgainButton.addEventListener('click', tryAgainButtonClickHandler);
    uploadAnotherFileButton.addEventListener('click', uploadAnotherFileButtonClickHandler);

    document.addEventListener('keydown', errorSectionKeydownEscHandler);
    document.addEventListener('click', errorSectionOutClickHandler);
  };

  var initiateAjaxOnFormSubmit = function () {
    var form = document.querySelector('.img-upload__form');
    var formSubmitHandler = function (evt) {
      evt.preventDefault();
      window.postLoad('https://js.dump.academy/kekstagram', onSuccessPost, onErrorPost);
    };
    form.addEventListener('submit', formSubmitHandler);
  };

  var initiateInsertImgOnChangeFileInput = function () {
    var fileInput = document.getElementById('upload-file');
    var image = document.querySelector('.img-upload__preview img');
    var fileInputChangeHandler = function (evt) {
      image.src = URL.createObjectURL(evt.target.files[0]);
    };
    fileInput.addEventListener('change', fileInputChangeHandler);
  };

  var initiateChangeImgSizeOnClickPlusMinusButtons = function () {
    var minusButton = document.querySelector('.scale__control--smaller');
    var plusButton = document.querySelector('.scale__control--bigger');
    var sizeInput = document.querySelector('.scale__control--value');
    var image = document.querySelector('.img-upload__preview img');
    var imageSize = 50;
    sizeInput.value = imageSize + '%';
    image.style.transform = 'scale(' + imageSize * 0.01 + ')';
    var minusButtonClickHandler = function () {
      if (imageSize >= 1 && imageSize <= 100) {
        imageSize = imageSize - 25;
        image.style.transform = 'scale(' + imageSize * 0.01 + ')';
        sizeInput.value = imageSize + '%';
      }
    };
    var plusButtonClickHandler = function () {
      if (imageSize >= 0 && imageSize <= 99) {
        imageSize = imageSize + 25;
        image.style.transform = 'scale(' + imageSize * 0.01 + ')';
        sizeInput.value = imageSize + '%';
      }
    };
    minusButton.addEventListener('click', minusButtonClickHandler);
    plusButton.addEventListener('click', plusButtonClickHandler);
  };

  initiateInsertImgOnChangeFileInput();

  initiateChangeImgSizeOnClickPlusMinusButtons();

  initiateAjaxOnFormSubmit();

  initiateCheckOnChangeElementOfForm('.text__description', TextareaChecks);

  initiateCheckOnChangeElementOfForm('.text__hashtags', HashtagsChecks);

  stopEventPropagationOnKeydownEscOnCommentary();

  openEditFormOnDownloadPic();

  changeFilterOnChangeFilterRadioButton();
  changeFilterIntensityOnMouseUp();

  initiateLevelPinDrugAndDrop('.effect-level__pin', '.img-upload__effect-level', '.effect-level__depth', '.img-upload__preview', '.effect-level__value');
})();
