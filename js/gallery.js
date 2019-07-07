'use strict';

(function () {

  var onError = function (message) {
    var messageElement = document.querySelector('p');
    var bodyElement = document.querySelector('body');
    messageElement.textContent = message;
    messageElement.style.color = 'red';
    messageElement.style.fontSize = '32px';
    messageElement.style.backgroundColor = 'white';
    bodyElement.insertBefore(messageElement, bodyElement.firstChild);
  };

  var onSuccess = function (data) {
    insertUserPictureDomElements(getUserPictureDomElements(data));
    setFilterButtonClickHandler(data);
    insertDataForBigPic(data);
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

  var createFilterHandler = function (filterPopular, filterNew, filterDiscussed, data) {
    var lastTimeout = null;
    return function (evt) {
      deleteSpecificItemsOfParent('.pictures', '.picture');
      filterPopular.classList.remove('img-filters__button--active');
      filterNew.classList.remove('img-filters__button--active');
      filterDiscussed.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        var selectedPics = null;
        if (evt.target.id === 'filter-popular') {
          selectedPics = data;
        } else if (evt.target.id === 'filter-new') {
          selectedPics = getRandomNElementsFromArray(15, data);
        } else if (evt.target.id === 'filter-discussed') {
          selectedPics = getSortedArrayByDescending(data);
        }
        var selectedPicsDomElements = getUserPictureDomElements(selectedPics);
        insertUserPictureDomElements(selectedPicsDomElements);
      }, 1000);
    };
  };

  var setFilterButtonClickHandler = function (data) {
    var filterPopular = document.getElementById('filter-popular');
    var filterNew = document.getElementById('filter-new');
    var filterDiscussed = document.getElementById('filter-discussed');
    var filterHandler = createFilterHandler(filterPopular, filterNew, filterDiscussed, data);
    filterPopular.addEventListener('click', filterHandler);
    filterNew.addEventListener('click', filterHandler);
    filterDiscussed.addEventListener('click', filterHandler);
  };

  var getRandomInt = function (min, max) {
    var randomInt = Math.round(min + Math.random() * (max - min));
    return randomInt;
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

  var deleteHiddenFromBigPicture = function () {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');
  };

  var insertDataForBigPic = function (data) {
    document.querySelector('.big-picture__img').src = data[0].url;
    document.querySelector('.likes-count').textContent = data[0].likes;
    document.querySelector('.comments-count').textContent = data[0].comments.length;
    document.querySelector('.social__caption').textContent = data[0].description;
    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.comments-loader').classList.add('visually-hidden');
    var socialComment = document.querySelector('.social__comment').cloneNode(true);
    var socialComments = document.querySelector('.social__comments');
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }
    for (var i = 0; i < data[0].comments.length; i++) {
      var newSocialComment = socialComment.cloneNode(true);
      newSocialComment.querySelector('.social__picture').src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
      newSocialComment.querySelector('.social__text').textContent = data[0].comments[i].message;
      socialComments.appendChild(newSocialComment);
    }
  };

  deleteHiddenFromBigPicture();
})();
