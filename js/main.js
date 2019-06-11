'use strict';

var getRandomInt = function (min, max) {
  var randomInt = Math.round(Math.random() * (max - min));
  return randomInt;
};

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

var likesMinNumber = 15;
var likesMaxNumber = 201;

var getPhotosDescriptor = function (numberOfPictures) {
  var photosDescription = [];

  for (var i = 0; i < numberOfPictures; i++) {
    photosDescription[i] =
            {
              url: 'photos/' + (i + 1) + '.jpg',
              likes: getRandomInt(likesMinNumber, likesMaxNumber),
              comments: [],
            };
    var maxNumberOfComments = getRandomInt(0, 2); // 0 - 1 комментарий, 1 - 2 комментария, 2 - 3 комментария
    for (var j = 0; j <= maxNumberOfComments; j++) {
      photosDescription[i].comments[j] = {
        avatar: 'img/avatar-' + (i + 1) + '.svg',
        message: COMMENT_PHRASES [getRandomInt(0, COMMENT_PHRASES.length - 1)],
        name: NAMES [getRandomInt(0, NAMES.length - 1)],
      };
    }
  }
  return photosDescription;
};

var createUsersPictures = function (numberOfPictures) {
  var photosDescription = getPhotosDescriptor(numberOfPictures);
  var template = document.querySelector('#picture');
  var picture = template.content.querySelector('.picture').cloneNode(true);
  var pictureObjectsArray = [];
  for (var i = 0; i < photosDescription.length; i++) {
    var templateContent = {
      img: picture.querySelector('.picture__img').cloneNode(true),
      likes: picture.querySelector('.picture__likes').cloneNode(true),
      comments: [],
    };
    for (var j = 0; j < photosDescription[i].comments.length; j++) {
      templateContent.comments[j] = picture.querySelector('.picture__likes').cloneNode(true);
      templateContent.comments[j].textContent = photosDescription[i].comments[j].message;
    }
    templateContent.img.src = photosDescription[i].url;
    templateContent.likes.textContent = photosDescription[i].likes;
    pictureObjectsArray[i] = {
      img: templateContent.img,
      likes: templateContent.likes,
      comments: [],
    };
    for (j = 0; j < photosDescription[i].comments.length; j++) {
      pictureObjectsArray[i].comments[j] = templateContent.comments[j];
    }
  }
  return pictureObjectsArray;
};

var getPictureDocumentFragment = function (pictureObjectsArray) {

  var pictureDocumentFragment = new DocumentFragment();

  for (var i = 0; i < pictureObjectsArray.length; i++) {
    var template = document.querySelector('#picture').cloneNode(true);
    var reference = template.content.querySelector('.picture').cloneNode();
    var paragraph = template.content.querySelector('.picture__info').cloneNode(true);
    var spanComments = paragraph.querySelector('.picture__comments').cloneNode();
    var spanLikes = paragraph.querySelector('.picture__likes').cloneNode();
    spanComments.textContent = pictureObjectsArray[i].comments.length;
    spanLikes.textContent = pictureObjectsArray[i].likes;
    reference.appendChild(pictureObjectsArray[i].img);
    reference.appendChild(paragraph);
    pictureDocumentFragment.appendChild(reference);
  }
  return pictureDocumentFragment;
};

var insertDocumentFragment = function (pictureDocumentFragment, parentClass) {
  var section = document.querySelector('.' + parentClass);
  section.appendChild(pictureDocumentFragment);
};
console.log(getPictureDocumentFragment(createUsersPictures(25)), 'pictures');
insertDocumentFragment(getPictureDocumentFragment(createUsersPictures(25)), 'pictures');
