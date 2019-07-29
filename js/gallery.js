'use strict';

(function () {
  var body = document.querySelector('body');
  var imgFilters = body.querySelector('.img-filters');
  var filters = body.querySelectorAll('.img-filters__button');
  var picTemplate = body.querySelector('#picture');
  var picsParent = body.querySelector('.pictures');
  var bigPic = body.querySelector('.big-picture');
  var picCancel = bigPic.querySelector('.big-picture__cancel');


  var onSuccessGet = function (data) {
    insertUserPictureDomElements(getUserPictureDomElements(data));
    showImgFilters();
    initiateFilterButtonClickHandler(data);
    initiateOpenBigPicOnClickThumbnail(data);
  };

  var onErrorGet = function (message) {
    var messageParagraph = document.createElement('p');
    messageParagraph.textContent = message;
    messageParagraph.style.color = 'red';
    messageParagraph.style.fontSize = '32px';
    messageParagraph.style.height = '40px';
    messageParagraph.style.padding = '10px';
    messageParagraph.style.backgroundColor = 'white';
    body.insertBefore(messageParagraph, body.firstChild);
  };

  window.ajax.getLoad(window.UrlRequest.GET, onSuccessGet, onErrorGet);

  var showImgFilters = function () {
    imgFilters.classList.remove('img-filters--inactive');
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
          selectedPics = window.utility.getRandomNElementsFromArray(window.General.NUMBER_OF_RANDOM_PICS, data);
        } else if (evt.target.id === 'filter-discussed') {
          selectedPics = window.utility.getSortedArrayByDescending(data);
        }
        var selectedPicsDomElements = getUserPictureDomElements(selectedPics);
        insertUserPictureDomElements(selectedPicsDomElements);
        initiateOpenBigPicOnClickThumbnail(data);
      }, window.General.FILTER_TIMEOUT);
    };
  };

  var initiateFilterButtonClickHandler = function (data) {
    var filterHandler = createFilterHandler(filters[0], filters[1], filters[2], data);
    filters.forEach(function (filter) {
      filter.addEventListener('click', filterHandler);
    });
  };

  var getUserPictureDomElement = function (pictureObject) {
    var picture = picTemplate.content.querySelector('.picture').cloneNode(true);
    picture.querySelector('.picture__img').src = pictureObject.url;
    picture.querySelector('.picture__likes').textContent = pictureObject.likes;
    picture.querySelector('.picture__comments').textContent = pictureObject.comments.length;
    return picture;
  };

  var getUserPictureDomElements = function (picObjects) {
    var pictures = [];

    picObjects.forEach(function (picObject, i) {
      pictures[i] = getUserPictureDomElement(picObject);
    });

    return pictures;
  };

  var insertUserPictureDomElement = function (pictureDomElement) {
    var documentFragmentVar = new DocumentFragment();

    documentFragmentVar.appendChild(pictureDomElement);
    picsParent.appendChild(documentFragmentVar);
  };

  var deleteSpecificItemsOfParent = function (parent, deleteElementsSelector) {
    var elementsToBeDeleted = parent.querySelectorAll(deleteElementsSelector);
    elementsToBeDeleted.forEach(function (element) {
      parent.removeChild(element);
    });
  };

  var insertUserPictureDomElements = function (pictureDomElements) {
    for (var i = 0; i < pictureDomElements.length; i++) {
      insertUserPictureDomElement(pictureDomElements[i]);
    }
  };

  var deleteHiddenFromBigPicture = function () {
    bigPic.classList.remove('hidden');
  };

  var insertDataForBigPic = function (element) {
    deleteHiddenFromBigPicture();
    bigPic.querySelector('.big-picture__img img').src = element.url;
    bigPic.querySelector('.likes-count').textContent = element.likes;
    bigPic.querySelector('.comments-count').textContent = element.comments.length;
    bigPic.querySelector('.social__caption').textContent = element.description;
    bigPic.querySelector('.social__comment-count').classList.add('visually-hidden');
    var socialComment = bigPic.querySelector('.social__comment').cloneNode(true);
    var socialComments = bigPic.querySelector('.social__comments');
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }
    for (var i = 0; i < element.comments.length; i++) {
      var newSocialComment = socialComment.cloneNode(true);
      newSocialComment.querySelector('.social__picture').src = 'img/avatar-' + window.utility.getRandomInt(1, 6) + '.svg';
      newSocialComment.querySelector('.social__text').textContent = element.comments[i].message;
      socialComments.appendChild(newSocialComment);
    }

    initiateHideExtraCommentsUnderDownloadMoreButton();
    initiateDownloadMoreCommentsOnClickDownloadMoreButton();
  };

  var initiateHideBigPicOnEsc = function () {
    var bigPicEscKeydownHandler = function (evt) {
      if (evt.keyCode === window.KeyCode.ESC) {
        bigPic.classList.add('hidden');
        initiateHideExtraCommentsUnderDownloadMoreButton();
        resetDownloadMoreButtonHiding();
      }
    };
    document.addEventListener('keydown', bigPicEscKeydownHandler);
  };

  var initiateHideBigPicOnClickCloseButton = function () {
    var PicCancelClickHandler = function () {
      bigPic.classList.add('hidden');
      initiateHideExtraCommentsUnderDownloadMoreButton();
      resetDownloadMoreButtonHiding();
    };
    picCancel.addEventListener('click', PicCancelClickHandler);
  };

  var initiateOpenBigPicOnClickThumbnail = function (data) {
    var thumbNailsCollection = picsParent.querySelectorAll('.picture__img');

    var thumbnailClickHandler = function (evt) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].url === evt.currentTarget.getAttribute('src')) {
          var elementToBeInserted = data[i];
        }
      }
      insertDataForBigPic(elementToBeInserted);
    };

    var thumbnailEnterKeydownHandler = function (evt) {
      if (evt.keyCode === window.KeyCode.ENTER) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].url === evt.currentTarget.querySelector('.picture__img').getAttribute('src')) {
            var elementToBeInserted = data[i];
          }
        }
        insertDataForBigPic(elementToBeInserted);
      }
    };

    thumbNailsCollection.forEach(function (thumbNail) {
      thumbNail.addEventListener('click', thumbnailClickHandler);
      thumbNail.parentElement.addEventListener('keydown', thumbnailEnterKeydownHandler);
    });

  };

  var initiateHideExtraCommentsUnderDownloadMoreButton = function () {
    var comments = bigPic.querySelectorAll('.social__comment');
    if (comments.length > window.General.MAX_DOWNLOADED_COMMENTS) {
      for (var i = window.General.MAX_DOWNLOADED_COMMENTS; i < comments.length; i++) {
        comments[i].classList.add('visually-hidden');
      }
    }
  };

  var initiateDownloadMoreCommentsOnClickDownloadMoreButton = function () {
    var downloadMoreButton = bigPic.querySelector('.comments-loader');
    var comments = bigPic.querySelectorAll('.social__comment');
    if (comments.length < window.General.MAX_DOWNLOADED_COMMENTS) {
      downloadMoreButton.classList.add('visually-hidden');
    }
    var downloadMoreButtonClickHandler = function () {
      var commentsVisuallyHidden = bigPic.querySelector('.social__comments').querySelectorAll('.visually-hidden');
      var commentsShown = comments.length - commentsVisuallyHidden.length;
      var commentsRemainForDownloading = commentsVisuallyHidden.length;
      if (commentsRemainForDownloading > window.General.MAX_DOWNLOADED_COMMENTS) {
        for (var i = commentsShown; i < commentsShown + window.General.MAX_DOWNLOADED_COMMENTS; i++) {
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
      if (evt.keyCode === window.KeyCode.ESC) {
        downloadMoreButton.removeEventListener('click', downloadMoreButtonClickHandler);
      }
    };

    var bigPicCancelClickHandler = function () {
      downloadMoreButton.removeEventListener('click', downloadMoreButtonClickHandler);
    };

    downloadMoreButton.addEventListener('click', downloadMoreButtonClickHandler);
    document.addEventListener('keydown', escKeydownHandler);

    var bigPicCancel = bigPic.querySelector('.big-picture__cancel');
    bigPicCancel.addEventListener('click', bigPicCancelClickHandler);
  };

  var resetDownloadMoreButtonHiding = function () {
    bigPic.querySelector('.comments-loader').classList.remove('visually-hidden');
  };

  initiateHideBigPicOnEsc();
  initiateHideBigPicOnClickCloseButton();
})();
