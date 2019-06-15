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

insertUserPictureDomElements(getUserPictureDomElements(getPictureObjects(NUMBER_OF_PICTURES)));
