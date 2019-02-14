"use strict";

(function () {
  var $hd = document.querySelector('.cal-header'),
      $hddigit = document.querySelector('.digit'),
      $hdcal = document.querySelector('.cal'),
      $num = document.querySelectorAll('.cal-body span'),
      $sum = document.querySelector('.sum'),
      calw,
      calboxW = $hd.clientWidth - 40,
      textSize = function textSize(textW) {
    var fz = parseInt($hdcal.style.fontSize, 10);

    while (textW > calboxW) {
      fz -= 2;
      $hdcal.style.fontSize = fz + "px";
      textW = $hdcal.clientWidth;
    }
  },
      isNumber = function isNumber(obj) {
    // return (typeof (obj) === 'number');
    return parseFloat(obj);
  },
      toPrice = function toPrice(num) {
    console.log(num);

    if (!isNumber(num)) {
      return num;
    }

    num = String(num);

    if (num.length > 3) {
      return num.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
  },
      isCalculate = function isCalculate(dom, type) {
    dom.textContent = !parseInt(dom.textContent, 10) ? '' : dom.textContent;
    dom.textContent = dom.textContent + type.replace(/[^0-9]/, '');
  };

  $num.forEach(function (el, idx) {
    // let keyCode = el.getAttribute('data-key').split(',')[0] || el.getAttribute('data-key').split(',')[1];
    // console.log( keyCode )
    // window.addEventListener('keydown',function( event ){
    // });
    el.addEventListener('mousedown', function (event) {
      isCalculate($hddigit, this.textContent);
      isCalculate($hdcal, this.textContent);

      switch (this.classList.value) {
        case 'oper':
          $hdcal.textContent = '';
          $hddigit.textContent = $hddigit.textContent + " " + this.textContent + " ";
          break;

        case 'sum':
          var total = $hddigit.textContent.split(' '),
              arr = [];
          total.map(function (e) {
            if (e === '÷') {
              e = '/';
            } else if (e === '×') {
              e = '*';
            } else if (e === '−') {
              e = '-';
            } else if (e === '+') {
              e = '+';
            }

            arr.push(e);
          });
          $hdcal.textContent = eval(arr.join(''));
          break;

        case 'clear':
          $hddigit.textContent = 0;
          $hdcal.textContent = 0;
          break;

        default:
      } // if( this.classList.value === 'oper' ){
      //   $hdcal.textContent = '';
      //   $hddigit.textContent = `${$hddigit.textContent} ${this.textContent} `;
      // }
      // if( this.classList.value === 'sum' ){
      //   let total = $hddigit.textContent.split(' '),
      //       arr = [];
      //   total.map(function( e ){
      //     if( e === '÷' ){
      //       e = '/';
      //     }else if( e === '×' ){
      //       e = '*';
      //     }else if( e === '−' ){
      //       e = '-';
      //     }else if( e === '+' ){
      //       e = '+';
      //     }
      //     arr.push( e )
      //   });
      //   $hdcal.textContent = eval( arr.join('') );
      // }
      // if( this.classList.value === 'sum' ){
      // }


      calw = $hdcal.clientWidth;
      textSize(calw);
    });
  });
})();