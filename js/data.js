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

  var GAP_BETWEEN_INSIDE_AND_OUTSIDE_BARS = 20;

  var LEVEL_PIN_MAX_LEFT = 452;

  var EFFECTS = {
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

  window.data = {
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
    GAP_BETWEEN_INSIDE_AND_OUTSIDE_BARS: GAP_BETWEEN_INSIDE_AND_OUTSIDE_BARS,
    LEVEL_PIN_MAX_LEFT: LEVEL_PIN_MAX_LEFT,
    EFFECTS: EFFECTS
  };
})();
