'use strict';

var COMMENT_PHRASES = [
  'Всё отлично!',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];

var MAX_NUMBER_OF_COMMENTS = 3;

var NAMES = [
  'Артём',
  'Сергей',
  'Иван',
  'Михаил',
  'Руслан',
];

var LIKES_MIN_NUMBER = 15;
var LIKES_MAX_NUMBER = 201;

var NUMBER_OF_PICTURES = 25;

var EFFECTS = {
  'effect-chrome': {
    FILTER: 'grayscale',
    MAX: 1,
    UNITS: ''
  },
  'effect-sepia': {
    FILTER: 'sepia',
    MAX: 1,
    UNITS: ''
  },
  'effect-marvin': {
    FILTER: 'invert',
    MAX: 100,
    UNITS: '%'
  },
  'effect-phobos': {
    FILTER: 'blur',
    MAX: 3,
    UNITS: 'px'
  },
  'effect-heat': {
    FILTER: 'brightness',
    MAX: 3,
    UNITS: ''}
};

var STEPS_COUNT = 100;

var FILTER_VALUE_INPUT_TEST = 20;

var FILTER_VALUE_INPUT_MAX = 100;

var ESC_KEY_CODE = 27;

var GAP_BETWEEN_INSIDE_AND_OUTSIDE_BARS = 20;

var LEVEL_PIN_MAX_LEFT = 452;

var getRandomInt = function (min, max) {
  var randomInt = Math.round(Math.random() * (max - min));
  return randomInt;
};

var getPictureObjects = function (numberOfPictures) {
  var pictureObjects = [];

  for (var i = 0; i < numberOfPictures; i++) {
    pictureObjects[i] =
            {
              url: 'photos/' + (i + 1) + '.jpg',
              likes: getRandomInt(LIKES_MIN_NUMBER, LIKES_MAX_NUMBER),
              comments: [],
            };
    var maxNumberOfComments = getRandomInt(0, MAX_NUMBER_OF_COMMENTS - 1); // 0 - 1 комментарий, 1 - 2 комментария, 2 - 3 комментария
    for (var j = 0; j <= maxNumberOfComments; j++) {
      pictureObjects[i].comments[j] = {
        avatar: 'img/avatar-' + (i + 1) + '.svg',
        message: COMMENT_PHRASES [getRandomInt(0, COMMENT_PHRASES.length - 1)],
        name: NAMES [getRandomInt(0, NAMES.length - 1)],
      };
    }
  }
  return pictureObjects;
};

var getUserPictureDomElement = function (pictureObject) {
  var template = document.querySelector('#picture');
  var picture = template.content.querySelector('.picture').cloneNode(true);
  picture.querySelector('.picture__img').src = pictureObject.url;
  picture.querySelector('.picture__likes').textContent = pictureObject.likes;
  picture.querySelector('.picture__comments').textContent = pictureObject.comments.length;
  return picture;
};

var getUserPictureDomElements = function (pictureObjects) {
  var pictures = [];
  for (var i = 0; i < pictureObjects.length; i++) {
    pictures[i] = getUserPictureDomElement(pictureObjects[i]);
  }
  return pictures;
};

var insertUserPictureDomElement = function (pictureDomElement) {
  var documentFragmentVar = new DocumentFragment();

  documentFragmentVar.appendChild(pictureDomElement);
  var parent = document.querySelector('.pictures');
  parent.appendChild(documentFragmentVar);
};

var insertUserPictureDomElements = function (pictureDomElements) {
  for (var i = 0; i < pictureDomElements.length; i++) {
    insertUserPictureDomElement(pictureDomElements[i]);
  }
};

var closeEditFormOnKeydownEscAndOnClickCloseButton = function () {
  // OnKeydownEsc
  var editForm = document.querySelector('.img-upload__overlay');
  var editFormEscKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
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
  return effect.FILTER + '(' + filterValueInput * effect.MAX / STEPS_COUNT + effect.UNITS + ')';
}

var changeFilterIntensityOnMouseUp = function () {
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var sliderPin = document.querySelector('.effect-level__pin');
  var filterValueInput = document.querySelector('.effect-level__value');
  var sliderPinMouseUpHandler = function () {
    filterValueInput.value = FILTER_VALUE_INPUT_TEST;
    var effectKey = imgUploadPreview.classList[1];
    imgUploadPreview.style.filter = buildEffectStyle(EFFECTS[effectKey], filterValueInput.value);
  };
  sliderPin.addEventListener('mouseup', sliderPinMouseUpHandler);
};

var changeFilterOnChangeFilterRadioButton = function () {
  var radioButtons = document.querySelector('.effects__list').cloneNode(true);
  var radioButtonChangeHandler = function (evt) {

    var levelPin = document.querySelector('.effect-level__pin');
    var levelDepth = document.querySelector('.effect-level__depth');
    levelPin.style.left = LEVEL_PIN_MAX_LEFT + 'px';
    levelDepth.style.width = LEVEL_PIN_MAX_LEFT + 'px';

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
      filterValueInput.value = FILTER_VALUE_INPUT_MAX;
      imgUploadPreview.style.filter = buildEffectStyle(EFFECTS[evt.currentTarget.id], filterValueInput.value);
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

    var shiftX = shift.x - GAP_BETWEEN_INSIDE_AND_OUTSIDE_BARS;

    if (shiftX < 0) {
      shiftX = 0;
    }
    if (shiftX > LEVEL_PIN_MAX_LEFT) {
      shiftX = LEVEL_PIN_MAX_LEFT;
    }

    levelPin.style.left = shiftX + 'px';

    levelDepth.style.width = shiftX + 'px';

    var intensityInput = document.querySelector(intensityInputSelector);

    intensityInput.value = getValueOfLevelPin(levelPinSelector);

    elementToBeProcessed.style.filter = buildEffectStyle(EFFECTS[elementToBeProcessed.classList[1]], intensityInput.value);
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
  var valueOfLevelPin = levelPin.style.left.substring(0, levelPin.style.left.length - 2) * FILTER_VALUE_INPUT_MAX / LEVEL_PIN_MAX_LEFT;
  return valueOfLevelPin;
};

initiateCheckOnChangeElementOfForm('.text__description');

stopEventPropagationOnKeydownEscOnCommentary();

insertUserPictureDomElements(getUserPictureDomElements(getPictureObjects(NUMBER_OF_PICTURES)));

openEditFormOnDownloadPic();

changeFilterOnChangeFilterRadioButton();
changeFilterIntensityOnMouseUp();

initiateLevelPinDrugAndDrop('.effect-level__pin', '.img-upload__effect-level', '.effect-level__depth', '.img-upload__preview', '.effect-level__value');
