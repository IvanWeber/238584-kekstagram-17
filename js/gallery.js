'use strict';

(function () {

  var body = document.querySelector('body');
  var imgFilters = body.querySelector('.img-filters');
  var filters = body.querySelectorAll('.img-filters__button');
  var picTemplate = body.querySelector('#picture');
  var picsParent = body.querySelector('.pictures');

  var onError = function (message) {
    var messageParagraph = document.querySelector('p');
    messageParagraph.textContent = message;
    messageParagraph.style.color = 'red';
    messageParagraph.style.fontSize = '32px';
    messageParagraph.style.backgroundColor = 'white';
    body.insertBefore(messageParagraph, body.firstChild);
  };

  var onSuccess = function (data) {
    insertUserPictureDomElements(getUserPictureDomElements(data));
    showImgFilters();
    setFilterButtonClickHandler(data);
    initiateOpenBigPicOnClickThumbnail(data);
  };

  window.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);

  var showImgFilters = function () {
    imgFilters.classList.remove('img-filters--inactive');
  };

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
      deleteSpecificItemsOfParent(picsParent, '.picture');
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
        initiateOpenBigPicOnClickThumbnail(data);
      }, 1000);
    };
  };

  var setFilterButtonClickHandler = function (data) {
    var filterHandler = createFilterHandler(filters[0], filters[1], filters[2], data);
    filters[0].addEventListener('click', filterHandler);
    filters[1].addEventListener('click', filterHandler);
    filters[2].addEventListener('click', filterHandler);
  };

  var getRandomInt = function (min, max) {
    var randomInt = Math.round(min + Math.random() * (max - min));
    return randomInt;
  };

  var getUserPictureDomElement = function (pictureObject) {
    var picture = picTemplate.content.querySelector('.picture').cloneNode(true);
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
    picsParent.appendChild(documentFragmentVar);
  };

  var deleteSpecificItemsOfParent = function (parent, deleteElementsSelector) {
    var elementsToBeDeleted = document.querySelectorAll(deleteElementsSelector);
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
    var bigPic = document.querySelector('.big-picture');
    bigPic.classList.remove('hidden');
  };

  var insertDataForBigPic = function (element) {
    deleteHiddenFromBigPicture();
    document.querySelector('.big-picture__img img').src = element.url;
    document.querySelector('.likes-count').textContent = element.likes;
    document.querySelector('.comments-count').textContent = element.comments.length;
    document.querySelector('.social__caption').textContent = element.description;
    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    var socialComment = document.querySelector('.social__comment').cloneNode(true);
    var socialComments = document.querySelector('.social__comments');
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }
    for (var i = 0; i < element.comments.length; i++) {
      var newSocialComment = socialComment.cloneNode(true);
      newSocialComment.querySelector('.social__picture').src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
      newSocialComment.querySelector('.social__text').textContent = element.comments[i].message;
      socialComments.appendChild(newSocialComment);
    }

    initiateHideExtraCommentsUnderDownloadMoreButton();
    initiateDownloadMoreCommentsOnClickDownloadMoreButton();
  };

  var initiateHideBigPicOnEsc = function () {
    var bigPic = document.querySelector('.big-picture');
    var bigPicEscKeydownHandler = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEY_CODE) {
        bigPic.classList.add('hidden');
        initiateHideExtraCommentsUnderDownloadMoreButton();
        resetDownloadMoreButtonHiding();
      }
    };
    document.addEventListener('keydown', bigPicEscKeydownHandler);
  };

  var initiateHideBigPicOnClickCloseButton = function () {
    var bigPic = document.querySelector('.big-picture');
    var picCancel = document.getElementById('picture-cancel');
    var PicCancelClickHandler = function () {
      bigPic.classList.add('hidden');
      initiateHideExtraCommentsUnderDownloadMoreButton();
      resetDownloadMoreButtonHiding();
    };
    picCancel.addEventListener('click', PicCancelClickHandler);
  };

  var initiateOpenBigPicOnClickThumbnail = function (data) {
    var thumbNailsCollection = document.querySelectorAll('.picture__img');
    var thumbnailClickHandler = function (evt) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].url === evt.currentTarget.getAttribute('src')) {
          var elementToBeInserted = data[i];
        }
      }
      insertDataForBigPic(elementToBeInserted);
    };
    var thumbnailEnterKeydownHandler = function (evt) {
      if (evt.keyCode === 13) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].url === evt.currentTarget.querySelector('.picture__img').getAttribute('src')) {
            var elementToBeInserted = data[i];
          }
        }
        insertDataForBigPic(elementToBeInserted);
      }
    };
    for (var i = 0; i < thumbNailsCollection.length; i++) {
      thumbNailsCollection[i].addEventListener('click', thumbnailClickHandler);
      thumbNailsCollection[i].parentElement.addEventListener('keydown', thumbnailEnterKeydownHandler);
    }
  };

  var initiateHideExtraCommentsUnderDownloadMoreButton = function () {
    var comments = document.querySelectorAll('.social__comment');
    if (comments.length > 5) {
      for (var i = 5; i < comments.length; i++) {
        comments[i].classList.add('visually-hidden');
      }
    }
  };

  var initiateDownloadMoreCommentsOnClickDownloadMoreButton = function () {
    var downloadMoreButton = document.querySelector('.comments-loader');
    var comments = document.querySelectorAll('.social__comment');
    if (comments.length < 5) {
      downloadMoreButton.classList.add('visually-hidden');
    }
    var downloadMoreButtonClickHandler = function () {
      var commentsVisuallyHidden = document.querySelector('.social__comments').querySelectorAll('.visually-hidden');
      var commentsShown = comments.length - commentsVisuallyHidden.length;
      var commentsRemainForDownloading = commentsVisuallyHidden.length;
      if (commentsRemainForDownloading > 5) {
        for (var i = commentsShown; i < commentsShown + 5; i++) {
          comments[i].classList.remove('visually-hidden');
        }
      } else {
        for (var j = commentsShown; j < commentsShown + commentsRemainForDownloading; j++) {
          comments[j].classList.remove('visually-hidden');
          downloadMoreButton.classList.add('visually-hidden');
        }
      }
    };

    var escKeydownHandler = function (evt) {
      if (evt.keyCode === window.constants.ESC_KEY_CODE) {
        downloadMoreButton.removeEventListener('click', downloadMoreButtonClickHandler);
      }
    };

    var bigPicCancelClickHandler = function () {
      downloadMoreButton.removeEventListener('click', downloadMoreButtonClickHandler);
    };

    downloadMoreButton.addEventListener('click', downloadMoreButtonClickHandler);
    document.addEventListener('keydown', escKeydownHandler);

    var bigPicCancel = document.querySelector('.big-picture__cancel');
    bigPicCancel.addEventListener('click', bigPicCancelClickHandler);
  };

  var resetDownloadMoreButtonHiding = function () {
    document.querySelector('.comments-loader').classList.remove('visually-hidden');
  };

  initiateHideBigPicOnEsc();
  initiateHideBigPicOnClickCloseButton();
})();
