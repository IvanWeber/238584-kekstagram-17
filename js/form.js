'use strict';
(function () {
  var closeEditFormOnKeydownEscAndOnClickCloseButton = function () {
  // OnKeydownEsc
    var editForm = document.querySelector('.img-upload__overlay');
    var editFormEscKeydownHandler = function (evt) {
      if (evt.keyCode === window.data.ESC_KEY_CODE) {
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
    return effect.FILTER + '(' + filterValueInput * effect.MAX / window.data.STEPS_COUNT + effect.UNITS + ')';
  }

  var changeFilterIntensityOnMouseUp = function () {
    var imgUploadPreview = document.querySelector('.img-upload__preview');
    var sliderPin = document.querySelector('.effect-level__pin');
    var filterValueInput = document.querySelector('.effect-level__value');
    var sliderPinMouseUpHandler = function () {
      filterValueInput.value = window.data.FILTER_VALUE_INPUT_TEST;
      var effectKey = imgUploadPreview.classList[1];
      imgUploadPreview.style.filter = buildEffectStyle(window.data.EFFECTS[effectKey], filterValueInput.value);
    };
    sliderPin.addEventListener('mouseup', sliderPinMouseUpHandler);
  };

  var changeFilterOnChangeFilterRadioButton = function () {
    var radioButtons = document.querySelector('.effects__list').cloneNode(true);
    var radioButtonChangeHandler = function (evt) {

      var levelPin = document.querySelector('.effect-level__pin');
      var levelDepth = document.querySelector('.effect-level__depth');
      levelPin.style.left = window.data.LEVEL_PIN_MAX_LEFT + 'px';
      levelDepth.style.width = window.data.LEVEL_PIN_MAX_LEFT + 'px';

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
        filterValueInput.value = window.data.FILTER_VALUE_INPUT_MAX;
        imgUploadPreview.style.filter = buildEffectStyle(window.data.EFFECTS[evt.currentTarget.id], filterValueInput.value);
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
      if (evt.which === 27) {
        evt.stopPropagation();
      }
    };
    commentaryElement.addEventListener('keydown', commentaryElementKeydownEscHandler);
  };

  var TEXTAREA_CHECKS = [{
    checker: function (value) {
      return value.length < 140;
    },
    message: 'Длина сообщения должна быть меньше 140 символов',
  }
  ];

  var HASHTAGS_CHECKS = [
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
      message: 'Каждый новый хэштег после пробела должен начинаться с символа #'
    }
  ];

  var initiateCheckOnChangeElementOfForm = function (elementSelector, checks) {
    var element = document.querySelector(elementSelector);
    var commentaryElementChangeHandler = function () {
      element.setCustomValidity('');
      for (var i = 0; i < checks.length; i++) {
        if (!checks[i].checker(element.value)) {
          element.setCustomValidity(checks[i].message);
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

    var movePin = function (event) {
      event.preventDefault();

      var rect = levelOuterLine.getBoundingClientRect();

      var shift = {
        x: event.clientX - rect.x
      };

      var shiftX = shift.x - window.data.GAP_BETWEEN_INSIDE_AND_OUTSIDE_BARS;

      if (shiftX < 0) {
        shiftX = 0;
      }
      if (shiftX > window.data.LEVEL_PIN_MAX_LEFT) {
        shiftX = window.data.LEVEL_PIN_MAX_LEFT;
      }

      levelPin.style.left = shiftX + 'px';

      levelDepth.style.width = shiftX + 'px';

      var intensityInput = document.querySelector(intensityInputSelector);

      intensityInput.value = Math.round(getValueOfLevelPin(levelPinSelector));

      elementToBeProcessed.style.filter = buildEffectStyle(window.data.EFFECTS[elementToBeProcessed.classList[1]], intensityInput.value);
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
    var valueOfLevelPin = levelPin.style.left.substring(0, levelPin.style.left.length - 2) * window.data.FILTER_VALUE_INPUT_MAX / window.data.LEVEL_PIN_MAX_LEFT;
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
      if (evt.keyCode === window.data.ESC_KEY_CODE) {
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
      if (evt.keyCode === window.data.ESC_KEY_CODE) {
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
    // var submitButton = document.querySelector('.img-upload__submit');
    // var submitButtonClickHandler = function (evt) {
    //   evt.preventDefault();
    //   window.postLoad('https://js.dump.academy/kekstagram', onSuccessPost, onErrorPost);
    // };
    // submitButton.addEventListener('click', submitButtonClickHandler);

    var form = document.querySelector('.img-upload__form');
    var formSubmitHandler = function (evt) {
      evt.preventDefault();
      window.postLoad('https://js.dump.academy/kekstagram', onSuccessPost, onErrorPost);
    };
    form.addEventListener('submit', formSubmitHandler);
  };

  initiateAjaxOnFormSubmit();

  initiateCheckOnChangeElementOfForm('.text__description', TEXTAREA_CHECKS);

  initiateCheckOnChangeElementOfForm('.text__hashtags', HASHTAGS_CHECKS);

  stopEventPropagationOnKeydownEscOnCommentary();

  openEditFormOnDownloadPic();

  changeFilterOnChangeFilterRadioButton();
  changeFilterIntensityOnMouseUp();

  initiateLevelPinDrugAndDrop('.effect-level__pin', '.img-upload__effect-level', '.effect-level__depth', '.img-upload__preview', '.effect-level__value');
})();
