"use strict";

(function () {
  var $body = document.querySelector('body,html'),
      $photo = document.querySelector('.photo ul'),
      $lightbox = document.querySelector('.lightbox'),
      $photoItem = void 0,
      photoLen = void 0,
      obj2String = function obj2String(obj) {
    var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var idx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    for (var item in obj) {
      arr[idx++] = [item, obj[item]];
    }

    return new URLSearchParams(arr).toString();
  },
      getImgDate = function getImgDate(callback) {
    var url = 'https://api.unsplash.com/search/photos/',
        data = {
      client_id: '638a09cc19649eec10f02d85bacc10ec135a94c451ec1e42ce21a8c75591ab3d',
      query: 'fox',
      per_page: 6,
      collections: 'fox'
    };
    url += '?' + obj2String(data); // fetch 請求 api資料時 沒有帶參數功能 所以必需寫在網址上

    fetch(url, {
      method: 'GET'
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      callback(data.results);
    }).catch(function (e) {
      return console.log('error', e);
    });
  },
      template = function template(data) {
    var _photoIdx = data.dataset.idx,
        _photoDesc = data.dataset.desc,
        _photoAuthor = data.dataset.author,
        _photoUrl = data.dataset.url;
    var str = "\n        <div class=\"lightbox-container\">\n          <div class=\"lightbox-photo\">\n            <i class=\"lightbox-close fas fa-times-circle\"></i>\n            <i class=\"lightbox-prev fas fa-chevron-left\"></i>\n            <i class=\"lightbox-next fas fa-chevron-right\"></i>\n            <figure>\n              <img src=\"" + _photoUrl + "\" alt=\"\">\n            </figure>\n          </div>\n          <div class=\"lightbox-info\">\n            <div class=\"num\"><i>" + (+_photoIdx + 1) + "</i>/" + photoLen + "</div>\n            <div class=\"desc\">\n              <p class=\"text\">" + _photoDesc + "</p>\n              <p class=\"author\">\u2014" + _photoAuthor + "</p>\n            </div>\n          </div> \n        </div>\n        ";
    return str;
  },
      creatLightbox = function creatLightbox(e) {
    var _self = this;

    $body.classList.add('is-lightbox');
    $lightbox.classList.add('is-active');
    $lightbox.innerHTML = template(_self);
    var _photoIdx = _self.dataset.idx,
        $lbimg = document.querySelector('.lightbox figure img'),
        $lbnum = document.querySelector('.lightbox .num i'),
        $lbdesc = document.querySelector('.lightbox .desc .text'),
        $lbauthor = document.querySelector('.lightbox .desc .author');
    $lightbox.addEventListener('click', function (e) {
      if (e.target.className.match(/(lightbox-next)/)) {
        if (_photoIdx < photoLen - 1) {
          _photoIdx = +_photoIdx + 1;
        } else {
          _photoIdx = 0;
        }
      } else if (e.target.className.match(/(lightbox-prev)/)) {
        if (_photoIdx > 0) {
          _photoIdx = +_photoIdx - 1;
        } else {
          _photoIdx = photoLen - 1;
        }
      } else if (e.target.className.match(/(lightbox-close)/)) {
        $body.classList.remove('is-lightbox');
        $lightbox.classList.remove('is-active');
        return;
      }

      $lbimg.setAttribute('src', $photoItem[_photoIdx].dataset.url);
      $lbnum.innerHTML = +$photoItem[_photoIdx].dataset.idx + 1;
      $lbdesc.innerHTML = $photoItem[_photoIdx].dataset.desc;
      $lbauthor.innerHTML = $photoItem[_photoIdx].dataset.author;
    });
  },
      init = function init() {
    getImgDate(function (data) {
      var str = '';
      photoLen = data.length;
      data.map(function (e, i) {
        str += "\n          <li \n            data-idx=\"" + i + "\" \n            data-desc=\"" + (!e.description ? e.alt_description : e.description) + "\"\n            data-author=\"" + e.user.name + "\"\n            data-url=\"" + e.urls.raw + "&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=825&h=550&max-w=825&max-h=550&fit=max\"\n          ><img src=\"" + e.urls.raw + "&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=255&h=255&max-w=255&max-h=255&fit=crop\" alt=\"\"></li>\n          ";
      });
      $photo.innerHTML = str;
      $photoItem = document.querySelectorAll('li');
      $photoItem.forEach(function (e) {
        e.addEventListener('click', creatLightbox);
      });
    });
  };

  init();
})();