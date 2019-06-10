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

var getPhotosDescriptor = function (numberOfPhotos) {
  var photosDescription = [];

  for (var i = 0; i < numberOfPhotos; i++) {
    photosDescription[i] =
            {
              url: 'photos/' + (i + 1) + '.jpg',
              likes: getRandomInt(15, 201),
              comments: [],
            };
    var jMax = getRandomInt(0, 2);
    for (var j = 0; j <= jMax; j++) {
      photosDescription[i].comments[j] = {
        avatar: 'img/avatar-' + (i + 1) + '.svg',
        message: COMMENT_PHRASES [getRandomInt(0, COMMENT_PHRASES.length - 1)],
        name: NAMES [getRandomInt(0, NAMES.length - 1)],
      };
    }
  }
  return photosDescription;
};

console.log(getPhotosDescriptor(25));
