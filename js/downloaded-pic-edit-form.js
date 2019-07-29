'use strict';
(function () {
  var picDownloaded = document.querySelector('.img-upload');
  var input = picDownloaded.querySelector('.img-upload__input');
  var slider = picDownloaded.querySelector('.img-upload__effect-level');
  var levelPin = picDownloaded.querySelector('.effect-level__pin');
  var levelDepth = picDownloaded.querySelector('.effect-level__depth');
  var filterValueInput = picDownloaded.querySelector('.effect-level__value');
  var imgUploadPreview = picDownloaded.querySelector('.img-upload__preview');
  var editForm = picDownloaded.querySelector('.img-upload__overlay');
  var commentary = picDownloaded.querySelector('.text__description');
  var minusButton = picDownloaded.querySelector('.scale__control--smaller');
  var plusButton = picDownloaded.querySelector('.scale__control--bigger');
  var sizeInput = picDownloaded.querySelector('.scale__control--value');
  var image = picDownloaded.querySelector('.img-upload__preview img');
  var uploadForm = picDownloaded.querySelector('.img-upload__form');
  var fileInput = picDownloaded.querySelector('.img-upload__input');


  var onSuccessPost = function () {

    editForm.classList.add('hidden');

    var template = document.querySelector('#success').cloneNode(true);
    var successSection = template.content.querySelector('.success').cloneNode(true);
    var main = document.querySelector('main');
    main.insertBefore(successSection, main.firstChild);
    var successButton = main.querySelector('.success__button');

    var removeEventListenersOnSuccessSection = function () {
      successButton.removeEventListener('click', successButtonClickHandler);
      document.removeEventListener('keydown', successSectionKeydownEscHandler);
      document.removeEventListener('click', successSectionOutClickHandler);
    };

    var successButtonClickHandler = function () {
      main.removeChild(successSection);
      uploadForm.reset();
      removeEventListenersOnSuccessSection();
    };

    var successSectionKeydownEscHandler = function (evt) {
      if (evt.keyCode === window.KeyCode.ESC) {
        main.removeChild(successSection);
        uploadForm.reset();
        removeEventListenersOnSuccessSection();
      }
    };

    var successSectionOutClickHandler = function (evt) {
      if (document.querySelector('.success__inner') !== null && !document.querySelector('.success__inner') !== undefined) {
        if (!document.querySelector('.success__inner').contains(evt.target)) {
          removeEventListenersOnSuccessSection();
          main.removeChild(successSection);
          uploadForm.reset();
        }
      }
    };

    successButton.addEventListener('click', successButtonClickHandler);
    document.addEventListener('keydown', successSectionKeydownEscHandler);
    document.addEventListener('click', successSectionOutClickHandler);
  };

  var onErrorPost = function () {

    editForm.classList.add('hidden');

    var template = document.querySelector('#error').cloneNode(true);
    var errorSection = template.content.querySelector('.error').cloneNode(true);
    var main = document.querySelector('main');
    main.insertBefore(errorSection, main.firstChild);
    var tryAgainButton = main.querySelectorAll('.error__button')[0];
    var uploadAnotherFileButton = main.querySelectorAll('.error__button')[1];

    var tryAgainButtonClickHandler = function () {
      main.removeChild(errorSection);
      window.ajax.postLoad(window.UrlRequest.POST, onSuccessPost, onErrorPost);
    };

    var uploadAnotherFileButtonClickHandler = function () {
      main.removeChild(errorSection);
      uploadForm.reset();
      document.querySelector('.img-upload__control').click();
    };

    var removeEventListenersOnErrorSection = function () {
      document.removeEventListener('keydown', errorSectionKeydownEscHandler);
      document.removeEventListener('click', errorSectionOutClickHandler);
    };

    var errorSectionKeydownEscHandler = function (evt) {
      if (evt.keyCode === window.KeyCode.ESC) {
        main.removeChild(errorSection);
        uploadForm.reset();
        removeEventListenersOnErrorSection();
      }
    };

    var errorSectionOutClickHandler = function (evt) {
      if (document.querySelector('.error__inner') !== null && !document.querySelector('.error__inner') !== undefined) {
        if (!document.querySelector('.error__inner').contains(evt.target)) {
          removeEventListenersOnErrorSection();
          main.removeChild(errorSection);
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
    var formSubmitHandler = function (evt) {
      evt.preventDefault();
      window.ajax.postLoad(window.UrlRequest.POST, onSuccessPost, onErrorPost);
    };
    uploadForm.addEventListener('submit', formSubmitHandler);
  };

  var initiateCloseEditFormOnKeydownEscAndOnClickCloseButton = function () {
  // OnKeydownEsc
    var editFormEscKeydownHandler = function (evt) {
      if (evt.keyCode === window.KeyCode.ESC) {
        editForm.classList.add('hidden');
        uploadForm.reset();
        document.removeEventListener('keydown', editFormEscKeydownHandler);
      }
    };
    document.addEventListener('keydown', editFormEscKeydownHandler);

    // OnClickCloseButton
    var closeButton = document.querySelector('.img-upload__cancel');
    var closeButtonClickHandler = function () {
      editForm.classList.add('hidden');
      uploadForm.reset();
      document.removeEventListener('keydown', editFormEscKeydownHandler);
    };
    closeButton.addEventListener('click', closeButtonClickHandler);

    // ButNotIfFocusOnInputField
    var hashTagsInput = editForm.querySelector('.text__hashtags');
    var descriptionInput = editForm.querySelector('.text__description');
    var hashTagsInputEscKeydownHandler = function (evt) {
      if (evt.keyCode === window.KeyCode.ESC) {
        evt.stopPropagation();
      }
    };
    var descriptionInputInputEscKeydownHandler = function (evt) {
      if (evt.keyCode === window.KeyCode.ESC) {
        evt.stopPropagation();
      }
    };
    hashTagsInput.addEventListener('keydown', hashTagsInputEscKeydownHandler);
    descriptionInput.addEventListener('keydown', descriptionInputInputEscKeydownHandler);
  };

  var initiateOpenEditFormOnDownloadPic = function () {
    var pictureInputChangeHandler = function () {
      slider.classList.remove('hidden');
      levelPin.style.left = window.PicDownloaded.LEVEL_PIN_MAX_LEFT + 'px';
      levelDepth.style.width = window.PicDownloaded.LEVEL_PIN_MAX_LEFT + 'px';
      filterValueInput.value = window.PicDownloaded.FILTER_VALUE_INPUT_MAX;
      imgUploadPreview.style.filter = buildEffectStyle(window.PicDownloaded.EFFECTS['effect-heat'], filterValueInput.value);
      editForm.classList.remove('hidden');
      initiateChangeFilterOnChangeFilterRadioButton();
      initiateCloseEditFormOnKeydownEscAndOnClickCloseButton();
      initiateChangeImgSizeOnClickPlusMinusButtons();
      initiateCheckOnChangeElementOfForm('.text__description', window.checks.textareaChecks);
      initiateCheckOnChangeElementOfForm('.text__hashtags', window.checks.hashtagsChecks);
    };
    input.addEventListener('change', pictureInputChangeHandler);
  };

  var buildEffectStyle = function (effect, filterInput) {
    return effect.FILTER + '(' + filterInput * effect.MAX / window.PicDownloaded.STEPS_COUNT + effect.UNITS + ')';
  };

  var initiateChangeFilterOnChangeFilterRadioButton = function () {
    var radioButtons = picDownloaded.querySelector('.effects__list').cloneNode(true);

    levelPin.style.left = window.PicDownloaded.LEVEL_PIN_MAX_LEFT + 'px';
    levelDepth.style.width = window.PicDownloaded.LEVEL_PIN_MAX_LEFT + 'px';

    imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
    imgUploadPreview.classList.add('effect-heat');

    imgUploadPreview.classList.add('effect-heat');
    slider.classList.remove('hidden');
    filterValueInput.value = window.PicDownloaded.FILTER_VALUE_INPUT_MAX;
    imgUploadPreview.style.filter = buildEffectStyle(window.PicDownloaded.EFFECTS['effect-heat'], filterValueInput.value);
    var radioButtonChangeHandler = function (evt) {

      levelPin.style.left = window.PicDownloaded.LEVEL_PIN_MAX_LEFT + 'px';
      levelDepth.style.width = window.PicDownloaded.LEVEL_PIN_MAX_LEFT + 'px';

      imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
      imgUploadPreview.classList.add(evt.currentTarget.id);

      if (evt.currentTarget.id === 'effect-none') {
        slider.classList.add('hidden');
        imgUploadPreview.style.filter = 'none';
      } else {
        slider.classList.remove('hidden');
        filterValueInput.value = window.PicDownloaded.FILTER_VALUE_INPUT_MAX;
        imgUploadPreview.style.filter = buildEffectStyle(window.PicDownloaded.EFFECTS[evt.currentTarget.id], filterValueInput.value);
      }
    };
    for (var i = 1; i <= radioButtons.childElementCount; i++) {
      var radioButton = picDownloaded.querySelector('.effects__item:nth-child(' + i + ')').querySelector('.effects__radio');
      radioButton.addEventListener('change', radioButtonChangeHandler);
    }
  };

  var initiateStopEventPropagationOnKeydownEscOnCommentary = function () {
    var commentaryElementKeydownEscHandler = function (evt) {
      if (evt.keyCode === window.KeyCode.ESC) {
        evt.stopPropagation();
      }
    };
    commentary.addEventListener('keydown', commentaryElementKeydownEscHandler);
  };

  var initiateCheckOnChangeElementOfForm = function (elementSelector, checks) {
    var element = picDownloaded.querySelector(elementSelector);
    element.setCustomValidity('');
    var commentaryElementChangeHandler = function () {
      element.setCustomValidity('');
      for (var i = 0; i < checks.length; i++) {
        if (!checks[i].checker(element.value)) {
          element.setCustomValidity(checks[i].message);
          document.styleSheets[0].insertRule(elementSelector + ':invalid { border-color: red; }', 0);
        }
      }
    };
    element.removeEventListener('input', commentaryElementChangeHandler);
    element.addEventListener('input', commentaryElementChangeHandler);
  };

  var initiateLevelPinDrugAndDrop = function () {

    var imageDiv = picDownloaded.querySelector('.img-upload__preview');

    var movePin = function (evt) {
      evt.preventDefault();

      var rect = slider.getBoundingClientRect();

      var shift = {
        x: evt.clientX - rect.x
      };

      var shiftX = shift.x - window.PicDownloaded.GAP_BETWEEN_INSIDE_AND_OUTSIDE_BARS;

      if (shiftX < 0) {
        shiftX = 0;
      }
      if (shiftX > window.PicDownloaded.LEVEL_PIN_MAX_LEFT) {
        shiftX = window.PicDownloaded.LEVEL_PIN_MAX_LEFT;
      }

      levelPin.style.left = shiftX + 'px';

      levelDepth.style.width = shiftX + 'px';

      filterValueInput.value = Math.round(getValueOfLevelPin());

      imageDiv.style.filter = buildEffectStyle(window.PicDownloaded.EFFECTS[imageDiv.classList[1]], filterValueInput.value);
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
    slider.addEventListener('mousedown', effectLevelLineMousedownHandler);
  };

  var getValueOfLevelPin = function () {
    var valueOfLevelPin = levelPin.style.left.substring(0, levelPin.style.left.length - 2) * window.PicDownloaded.FILTER_VALUE_INPUT_MAX / window.PicDownloaded.LEVEL_PIN_MAX_LEFT;
    return valueOfLevelPin;
  };

  var initiateInsertImgOnChangeFileInput = function () {
    var fileInputChangeHandler = function (evt) {
      image.src = URL.createObjectURL(evt.target.files[0]);
    };
    fileInput.addEventListener('change', fileInputChangeHandler);
  };

  var initiateChangeImgSizeOnClickPlusMinusButtons = function () {
    var imageSize = window.ImgSize.MAX_SIZE;
    sizeInput.value = imageSize + '%';
    image.style.transform = 'scale(' + imageSize * window.ImgSize.PERCENT_TO_DECIMAL_CALIBRATION + ')';
    var minusButtonClickHandler = function () {
      if (imageSize >= 1 && imageSize <= window.ImgSize.MAX_SIZE) {
        imageSize = imageSize - window.ImgSize.MIN_DIFFERENCE_SIZE;
        image.style.transform = 'scale(' + imageSize * window.ImgSize.PERCENT_TO_DECIMAL_CALIBRATION + ')';
        sizeInput.value = imageSize + '%';
      }
    };
    var plusButtonClickHandler = function () {
      if (imageSize >= 0 && imageSize <= window.ImgSize.MAX_SIZE - 1) {
        imageSize = imageSize + window.ImgSize.MIN_DIFFERENCE_SIZE;
        image.style.transform = 'scale(' + imageSize * window.ImgSize.PERCENT_TO_DECIMAL_CALIBRATION + ')';
        sizeInput.value = imageSize + '%';
      }
    };
    minusButton.addEventListener('click', minusButtonClickHandler);
    plusButton.addEventListener('click', plusButtonClickHandler);
  };

  initiateInsertImgOnChangeFileInput();

  initiateAjaxOnFormSubmit();

  initiateStopEventPropagationOnKeydownEscOnCommentary();

  initiateOpenEditFormOnDownloadPic();

  initiateLevelPinDrugAndDrop();
})();
