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
    if (imgUploadPreview.classList.contains('effect-chrome')) {
      filterValueInput.value = 20;
      imgUploadPreview.style.filter = 'grayscale(' + filterValueInput.value * 0.01 + ')';
    }
    if (imgUploadPreview.classList.contains('effect-sepia')) {
      filterValueInput.value = 20;
      imgUploadPreview.style.filter = 'sepia(' + filterValueInput.value * 0.01 + ')';
    }
    if (imgUploadPreview.classList.contains('effect-marvin')) {
      filterValueInput.value = 20;
      imgUploadPreview.style.filter = 'invert(' + filterValueInput.value + '%)';
    }
    if (imgUploadPreview.classList.contains('effect-phobos')) {
      filterValueInput.value = 20;
      imgUploadPreview.style.filter = 'blur(' + filterValueInput.value * 0.03 + 'px)';
    }
    if (imgUploadPreview.classList.contains('effect-heat')) {
      filterValueInput.value = 20;
      imgUploadPreview.style.filter = 'brightness(' + filterValueInput.value * 0.03 + ')';
    }
  };
  sliderPin.addEventListener('mouseup', sliderPinMouseUpHandler);
};

var changeFilterOnChangeFilterRadioButton = function () {
  var radioButtons = document.querySelector('.effects__list').cloneNode(true);
  var radioButtonChangeHandler = function (evt) {
    var imgUploadPreview = document.querySelector('.img-upload__preview');
    imgUploadPreview.classList.remove('effect-none');
    imgUploadPreview.classList.remove('effect-chrome');
    imgUploadPreview.classList.remove('effect-sepia');
    imgUploadPreview.classList.remove('effect-marvin');
    imgUploadPreview.classList.remove('effect-phobos');
    imgUploadPreview.classList.remove('effect-heat');
    imgUploadPreview.classList.add(evt.currentTarget.id);

    var slider = document.querySelector('.img-upload__effect-level');
    var filterValueInput = document.querySelector('.effect-level__value');

    if (evt.currentTarget.id === 'effect-none') {
      slider.classList.add('hidden');
      imgUploadPreview.style.filter = 'none';
    }
    if (evt.currentTarget.id === 'effect-chrome') {
      slider.classList.remove('hidden');
      filterValueInput.value = 100;
      imgUploadPreview.style.filter = 'grayscale(' + filterValueInput.value * 0.01 + ')';
    }
    if (evt.currentTarget.id === 'effect-sepia') {
      slider.classList.remove('hidden');
      filterValueInput.value = 100;
      imgUploadPreview.style.filter = 'sepia(' + filterValueInput.value * 0.01 + ')';
    }
    if (evt.currentTarget.id === 'effect-marvin') {
      slider.classList.remove('hidden');
      filterValueInput.value = 100;
      imgUploadPreview.style.filter = 'invert(' + filterValueInput.value + '%)';
    }
    if (evt.currentTarget.id === 'effect-phobos') {
      slider.classList.remove('hidden');
      filterValueInput.value = 100;
      imgUploadPreview.style.filter = 'blur(' + filterValueInput.value * 0.03 + 'px)';
    }
    if (evt.currentTarget.id === 'effect-heat') {
      slider.classList.remove('hidden');
      filterValueInput.value = 100;
      imgUploadPreview.style.filter = 'brightness(' + filterValueInput.value * 0.03 + ')';
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

