'use strict';

(function () {
  window.ajax = {

    getLoad: function (url, onSuccessGet, onErrorGet) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === window.AjaxConstants.SUCCESS_CODE) {
          onSuccessGet(xhr.response);
        } else {
          onErrorGet('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onErrorGet('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onErrorGet('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = window.AjaxConstants.TIMEOUT; // 10s

      xhr.open('GET', url);
      xhr.send();
    },

    postLoad: function (url, onSuccessPost, onErrorPost) {

      var form = document.querySelector('.img-upload__form');
      var body = new FormData(form);

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === window.AjaxConstants.SUCCESS_CODE) {
          onSuccessPost(xhr.response);
        } else {
          onErrorPost('При отправке данных произошла ошибка.', 'Статус ответа: ' + xhr.status);
        }
      });

      xhr.addEventListener('error', function () {
        onErrorPost('Произошла ошибка соединения');
      });

      xhr.open('POST', url);
      xhr.send(body);
    }

  };
})();
