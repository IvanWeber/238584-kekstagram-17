'use strict';

(function () {

  window.constants = {

    General: {
      MAX_DOWNLOADED_COMMENTS: 5,
      NUMBER_OF_RANDOM_PICS: 15,
      FILTER_TIMEOUT: 1000
    },

    PicDownloaded: {
      STEPS_COUNT: 100,
      FILTER_VALUE_INPUT_MAX: 100,
      GAP_BETWEEN_INSIDE_AND_OUTSIDE_BARS: 20,
      LEVEL_PIN_MAX_LEFT: 452,
      EFFECTS: {
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
      }
    },

    UrlRequest: {
      GET: 'https://js.dump.academy/kekstagram/data',
      POST: 'https://js.dump.academy/kekstagram'
    },

    KeyCode: {
      ESC: 27,
      ENTER: 13
    },

    Validation: {
      MESSAGE_MAX_LENGTH: 140,
      MAX_NUMBER_OF_HASHTAGS: 5,
      MAX_CHARS_OF_HASHTAG: 20
    },

    ImgSize: {
      MAX_SIZE: 100,
      MIN_SIZE: 25,
      SIZE_DIFFERENCE: 25,
      PERCENT_TO_DECIMAL_CALIBRATION: 0.01
    },

    AjaxConstants: {
      SUCCESS_CODE: 200,
      TIMEOUT: 10000
    }

  };

})();
