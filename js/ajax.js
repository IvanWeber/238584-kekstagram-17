'use strict';

(function () {
  window.ajax = {
    getLoad: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === window.AjaxConstants.SUCCESS_CODE) {
          onSuccess(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
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
