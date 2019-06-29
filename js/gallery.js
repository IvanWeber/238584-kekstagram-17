'use strict';

(function () {

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    insertUserPictureDomElements(getUserPictureDomElements(data));
    setFilterButtonClickHandler(data);
  };

  window.load(' https://js.dump.academy/kekstagram/data', onSuccess, onError);

  var showImgFilters = function () {
    var imgFiltersElement = document.querySelector('.img-filters');
    imgFiltersElement.classList.remove('img-filters--inactive');
  };
  showImgFilters();

  var getRandomNElementsFromArray = function (numberOfElements, array) {
    var arrayClone = array.slice();
    var randomNElementsFromArray = [];
    for (var i = 0; i < numberOfElements; i++) {
      var randIndex = getRandomInt(0, arrayClone.length - 1);
      randomNElementsFromArray[randomNElementsFromArray.length] = arrayClone[randIndex];
      arrayClone.splice(randIndex, 1);
    }
    return randomNElementsFromArray;
  };

  var getSortedArrayByDescending = function (array) {
    var arrayClone = array.slice();
    arrayClone.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return arrayClone;
  };

  var setFilterButtonClickHandler = function (data) {
    var filterPopular = document.getElementById('filter-popular');
    var filterNew = document.getElementById('filter-new');
    var filterDiscussed = document.getElementById('filter-discussed');
    var filterPopularClickHandler = function () {
      deleteSpecificItemsOfParent('.pictures', '.picture');
      filterPopular.classList.remove('img-filters__button--active');
      filterNew.classList.remove('img-filters__button--active');
      filterDiscussed.classList.remove('img-filters__button--active');
      filterPopular.classList.add('img-filters__button--active');
      insertUserPictureDomElements(getUserPictureDomElements(data));
    };
    var filterNewClickHandler = function () {
      deleteSpecificItemsOfParent('.pictures', '.picture');
      filterPopular.classList.remove('img-filters__button--active');
      filterNew.classList.remove('img-filters__button--active');
      filterDiscussed.classList.remove('img-filters__button--active');
      filterNew.classList.add('img-filters__button--active');
      insertUserPictureDomElements(getUserPictureDomElements(getRandomNElementsFromArray(10, data)));
    };
    var filterDiscussedClickHandler = function () {
      deleteSpecificItemsOfParent('.pictures', '.picture');
      filterPopular.classList.remove('img-filters__button--active');
      filterNew.classList.remove('img-filters__button--active');
      filterDiscussed.classList.remove('img-filters__button--active');
      filterDiscussed.classList.add('img-filters__button--active');
      insertUserPictureDomElements(getUserPictureDomElements(getSortedArrayByDescending(data)));
    };
    filterPopular.addEventListener('click', filterPopularClickHandler);
    filterNew.addEventListener('click', filterNewClickHandler);
    filterDiscussed.addEventListener('click', filterDiscussedClickHandler);
  };

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

  var deleteParentContent = function (parentSelector) {
    var parent = document.querySelector(parentSelector);
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  var deleteSpecificItemsOfParent = function (parentSelector, deleteElementsSelector) {
    var elementsToBeDeleted = document.querySelectorAll(deleteElementsSelector);
    var parent = document.querySelector(parentSelector);
    for (var i = 0; i < elementsToBeDeleted.length; i++) {
      parent.removeChild(elementsToBeDeleted[i]);
    }
  };

  var insertUserPictureDomElements = function (pictureDomElements) {
    for (var i = 0; i < pictureDomElements.length; i++) {
      insertUserPictureDomElement(pictureDomElements[i]);
    }
  };
})();
