'use strict';

var COMMENT_PHRASES = [
  'Всё отлично!',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];

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

var EFFECT_TYPES = [
  'effect-none',
  'effect-chrome',
  'effect-sepia',
  'effect-marvin',
  'effect-phobos',
  'effect-heat'
];

var EFFECT_FILTERS = [
  'none',
  'grayscale(',
  'sepia(',
  'invert(',
  'blur(',
  'brightness('
];

var EFFECT_FILTERS_CALIBRATION_NUMBER = [
  '',
  0.01,
  0.01,
  1,
  0.03,
  0.03
];

var EFFECT_FILTERS_UNITS = [
  '',
  ')',
  ')',
  '%)',
  'px)',
  ')'
];

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
    var maxNumberOfComments = getRandomInt(0, 2); // 0 - 1 комментарий, 1 - 2 комментария, 2 - 3 комментария
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

var openEditFormOnDownloadPic = function () {
  var inputElement = document.querySelector('.img-upload__input');
  var pictureInputChangeHandler = function () {
    var editFormElement = document.querySelector('.img-upload__overlay');
    editFormElement.classList.remove('hidden');
  };
  inputElement.addEventListener('change', pictureInputChangeHandler);
};

var closeEditFormOnClickCloseButton = function () {
  var closeButton = document.querySelector('.img-upload__cancel');
  var closeButtonClickHandler = function () {
    var editFormElement = document.querySelector('.img-upload__overlay');
    editFormElement.classList.add('hidden');
    var uploadForm = document.querySelector('.img-upload__form');
    uploadForm.reset();
  };
  closeButton.addEventListener('click', closeButtonClickHandler);
};

var closeEditFormOnKeydownEsc = function () {
  var editForm = document.querySelector('.img-upload__overlay');
  var editFormEscKeydownHandler = function (evt) {
    if (evt.keyCode === 27) {
      editForm.classList.add('hidden');
      var uploadForm = document.querySelector('.img-upload__form');
      uploadForm.reset();
    }
  };
  document.addEventListener('keydown', editFormEscKeydownHandler);
};

var changeFilterIntensityOnMouseUp = function () {
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var sliderPin = document.querySelector('.effect-level__pin');
  var filterValueInput = document.querySelector('.effect-level__value');
  var sliderPinMouseUpHandler = function () {
    for (var i = 1; i <= EFFECT_TYPES.length; i++) {
      if (imgUploadPreview.classList.contains(EFFECT_TYPES[i])) {
        filterValueInput.value = 20;
        imgUploadPreview.style.filter = EFFECT_FILTERS[i] + filterValueInput.value * EFFECT_FILTERS_CALIBRATION_NUMBER[i] + EFFECT_FILTERS_UNITS[i];
      }
    }
  };
  sliderPin.addEventListener('mouseup', sliderPinMouseUpHandler);
};

var changeFilterOnChangeFilterRadioButton = function () {
  var radioButtons = document.querySelector('.effects__list').cloneNode(true);
  var radioButtonChangeHandler = function (evt) {
    var imgUploadPreview = document.querySelector('.img-upload__preview');
    for (var i = 0; i < EFFECT_TYPES.length; i++) {
      imgUploadPreview.classList.remove(EFFECT_TYPES[i]);
    }
    imgUploadPreview.classList.add(evt.currentTarget.id);

    var slider = document.querySelector('.img-upload__effect-level');
    var filterValueInput = document.querySelector('.effect-level__value');

    if (evt.currentTarget.id === EFFECT_TYPES[0]) {
      slider.classList.add('hidden');
      imgUploadPreview.style.filter = EFFECT_FILTERS[0];
    }

    for (i = 1; i <= EFFECT_TYPES.length; i++) {
      if (evt.currentTarget.id === EFFECT_TYPES[i]) {
        slider.classList.remove('hidden');
        filterValueInput.value = 100;
        imgUploadPreview.style.filter = EFFECT_FILTERS[i] + filterValueInput.value * EFFECT_FILTERS_CALIBRATION_NUMBER[i] + EFFECT_FILTERS_UNITS[i];
      }
    }
  };
  for (var i = 1; i <= radioButtons.childElementCount; i++) {
    var radioButton = document.querySelector('.effects__item:nth-child(' + i + ')').querySelector('.effects__radio');
    radioButton.addEventListener('change', radioButtonChangeHandler);
  }
};

insertUserPictureDomElements(getUserPictureDomElements(getPictureObjects(NUMBER_OF_PICTURES)));

openEditFormOnDownloadPic();
closeEditFormOnClickCloseButton();
closeEditFormOnKeydownEsc();

changeFilterOnChangeFilterRadioButton();
changeFilterIntensityOnMouseUp();

