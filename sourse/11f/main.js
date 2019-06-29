(function() {
  let 
    $body = document.querySelector('body,html'),
    $photo = document.querySelector('.photo ul'),
    $lightbox = document.querySelector('.lightbox'),
    $photoItem,
    photoLen,
    obj2String = (obj, arr = [], idx = 0) => {
      for (let item in obj) {
        arr[idx++] = [item, obj[item]];
      }
      return new URLSearchParams(arr).toString();
    },
    getImgDate = function(callback){
      let url = 'https://api.unsplash.com/search/photos/',
        data = {
          client_id: '638a09cc19649eec10f02d85bacc10ec135a94c451ec1e42ce21a8c75591ab3d',
          query: 'fox',
          per_page: 6,
          collections: 'fox',
        };
      url += '?' + obj2String(data);

      // fetch 請求 api資料時 沒有帶參數功能 所以必需寫在網址上
      fetch(url, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(data => {
          callback(data.results);
        })
        .catch(e => console.log('error', e));
    },
    template = function( data ){
      const _photoIdx = data.dataset.idx,
            _photoDesc = data.dataset.desc,
            _photoAuthor = data.dataset.author,
            _photoUrl = data.dataset.url;
      let str= `
        <div class="lightbox-container">
          <div class="lightbox-photo">
            <i class="lightbox-close fas fa-times-circle"></i>
            <i class="lightbox-prev fas fa-chevron-left"></i>
            <i class="lightbox-next fas fa-chevron-right"></i>
            <figure>
              <img src="${ _photoUrl }" alt="">
            </figure>
          </div>
          <div class="lightbox-info">
            <div class="num"><i>${ +_photoIdx + 1 }</i>/${ photoLen }</div>
            <div class="desc">
              <p class="text">${ _photoDesc }</p>
              <p class="author">—${ _photoAuthor }</p>
            </div>
          </div> 
        </div>
        `;
      
      return str;
    },
    creatLightbox = function(e){
      const _self = this;
      $body.classList.add('is-lightbox');
      $lightbox.classList.add('is-active');
      $lightbox.innerHTML = template( _self );
      let _photoIdx = _self.dataset.idx,
          $lbimg = document.querySelector('.lightbox figure img'),
          $lbnum = document.querySelector('.lightbox .num i'),
          $lbdesc = document.querySelector('.lightbox .desc .text'),
          $lbauthor = document.querySelector('.lightbox .desc .author');
      $lightbox.addEventListener('click',function( e ){
        if( e.target.className.match(/(lightbox-next)/) ){
          if( _photoIdx < photoLen - 1 ){
            _photoIdx = +_photoIdx + 1;
          }else{
            _photoIdx = 0;
          }
        }else if( e.target.className.match(/(lightbox-prev)/) ){
          if( _photoIdx > 0){
            _photoIdx = +_photoIdx - 1;
          }else{
            _photoIdx = photoLen - 1;
          }
        }else if( e.target.className.match(/(lightbox-close)/) ){
          $body.classList.remove('is-lightbox');
          $lightbox.classList.remove('is-active');
          $lightbox.innerHTML = '';
          return;
        }
        $lbimg.setAttribute('src', $photoItem[_photoIdx].dataset.url);
        $lbnum.innerHTML = +$photoItem[_photoIdx].dataset.idx + 1;
        $lbdesc.innerHTML = $photoItem[_photoIdx].dataset.desc;
        $lbauthor.innerHTML = $photoItem[_photoIdx].dataset.author;
      });
    },
    init = function(){
      getImgDate(function(data) {
        let str = '';
        photoLen = data.length;
        data.map((e,i) => {
          str += `
          <li 
            data-idx="${ i }" 
            data-desc="${ (!e.description) ? e.alt_description : e.description }"
            data-author="${ e.user.name }"
            data-url="${ e.urls.raw }&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=825&h=550&max-w=825&max-h=550&fit=max"
          ><img src="${ e.urls.raw }&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=255&h=255&max-w=255&max-h=255&fit=crop" alt=""></li>
          `
        });
        $photo.innerHTML = str;
        $photoItem = document.querySelectorAll('li');
        $photoItem.forEach( e =>{
          e.addEventListener('click', creatLightbox);
        });
      });
    };

  init();
})();

