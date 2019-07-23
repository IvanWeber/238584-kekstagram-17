'use strict';
(function () {
  var COMMENT_PHRASES = [
    'Всё отлично!',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  ];

  var MAX_NUMBER_OF_COMMENTS = 3;

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

  var STEPS_COUNT = 100;

  var FILTER_VALUE_INPUT_TEST = 20;

  var FILTER_VALUE_INPUT_MAX = 100;

  var ESC_KEY_CODE = 27;

  var ENTER_KEY_CODE = 13;

  var GAP_BETWEEN_INSIDE_AND_OUTSIDE_BARS = 20;

  var LEVEL_PIN_MAX_LEFT = 452;

  var Effects = {
    'effect-chrome': {
      FILTER: 'grayscale',
      MAX: 1,
      UNITS: ''
    },
    'effect-sepia': {
      FILTER: 'sepia',
      MAX: 1,
      UNITS: ''
    },
    'effect-marvin': {
      FILTER: 'invert',
      MAX: 100,
      UNITS: '%'
    },
    'effect-phobos': {
      FILTER: 'blur',
      MAX: 3,
      UNITS: 'px'
    },
    'effect-heat': {
      FILTER: 'brightness',
      MAX: 3,
      UNITS: ''}
  };

  window.constants = {
    COMMENT_PHRASES: COMMENT_PHRASES,
    MAX_NUMBER_OF_COMMENTS: MAX_NUMBER_OF_COMMENTS,
    NAMES: NAMES,
    LIKES_MIN_NUMBER: LIKES_MIN_NUMBER,
    LIKES_MAX_NUMBER: LIKES_MAX_NUMBER,
    NUMBER_OF_PICTURES: NUMBER_OF_PICTURES,
    STEPS_COUNT: STEPS_COUNT,
    FILTER_VALUE_INPUT_TEST: FILTER_VALUE_INPUT_TEST,
    FILTER_VALUE_INPUT_MAX: FILTER_VALUE_INPUT_MAX,
    ESC_KEY_CODE: ESC_KEY_CODE,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    GAP_BETWEEN_INSIDE_AND_OUTSIDE_BARS: GAP_BETWEEN_INSIDE_AND_OUTSIDE_BARS,
    LEVEL_PIN_MAX_LEFT: LEVEL_PIN_MAX_LEFT,
    EFFECTS: Effects,
    MAX_DOWNLOADED_COMMENTS: 5,
    NUMBER_OF_RANDOM_PICS: 15,
    GET_REQUEST_URL: 'https://js.dump.academy/kekstagram/data',
    POST_REQUEST_URL: 'https://js.dump.academy/kekstagram',
  };

  window.validation = {
    MESSAGE_MAX_LENGTH: 140,
    MAX_NUMBER_OF_HASHTAGS: 5,
    MAX_CHARS_OF_HASHTAG: 20
  };

  window.imgSizes = {
    MAX_SIZE: 100,
    MIN_DIFFERENCE_SIZE: 25,
    PERCENT_TO_DECIMAL_CALIBRATION: 0.01,
  };

  window.imgSizes = {
    MAX_SIZE: 100,
    MIN_DIFFERENCE_SIZE: 25,
    PERCENT_TO_DECIMAL_CALIBRATION: 0.01,
  };
})();
