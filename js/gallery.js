'use strict';

(function () {

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    console.log(data);
    insertUserPictureDomElements(getUserPictureDomElements(data));
  };

  window.load(' https://js.dump.academy/kekstagram/data', onSuccess, onError);

  var showImgFilters = function () {
    var imgFiltersElement = document.querySelector('.img-filters');
    imgFiltersElement.classList.remove('img-filters--inactive');
  };
  showImgFilters();

  var getRandomInt = function (min, max) {
    var randomInt = Math.round(Math.random() * (max - min));
    return randomInt;
  };

  var getPictureObjects = function (data) {
    var pictureObjects = [];

    for (var i = 0; i < data.length; i++) {
      pictureObjects[i] =
          {
            url: data[i].url,
            likes: data[i].likes,
            comments: data[i].comments,
          };
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
})();
