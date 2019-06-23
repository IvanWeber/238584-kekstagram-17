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

  var CHECKS = [{
    checker: function (value) {
      return value.length < 140;
    },
    message: 'Длина сообщения должна быть меньше 140 символов',
  }
  ];

  var initiateCheckOnChangeElementOfForm = function (elementSelector) {
    var textarea = document.querySelector(elementSelector);
    var commentaryElementChangeHandler = function () {
      textarea.setCustomValidity('');
      for (var i = 0; i < CHECKS.length; i++) {
        if (!CHECKS[i].checker(textarea.value)) {
          textarea.setCustomValidity(CHECKS[i].message);
        }
      }
    };
    textarea.addEventListener('input', commentaryElementChangeHandler);
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

      intensityInput.value = getValueOfLevelPin(levelPinSelector);

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

  initiateCheckOnChangeElementOfForm('.text__description');

  stopEventPropagationOnKeydownEscOnCommentary();

  openEditFormOnDownloadPic();

  changeFilterOnChangeFilterRadioButton();
  changeFilterIntensityOnMouseUp();

  initiateLevelPinDrugAndDrop('.effect-level__pin', '.img-upload__effect-level', '.effect-level__depth', '.img-upload__preview', '.effect-level__value');
})();
