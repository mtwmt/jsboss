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
      isDigit = function isDigit(dom, type) {
    dom.textContent = !parseInt(dom.textContent, 10) ? '' : dom.textContent;

    if (dom.textContent.length > 0) {
      dom.textContent = dom.textContent + type.replace(/[^0-9]/, '');
    } else {
      dom.textContent = dom.textContent + type.replace(/[^0-9]/, '0');
    }
  },
      isCalculate = function isCalculate(dom) {
    switch (dom.classList.value) {
      case 'oper':
        $hdcal.textContent = '';
        $hddigit.textContent = $hddigit.textContent + " " + dom.textContent + " ";
        break;

      case 'dot':
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
        break;
    }
  };

  $num.forEach(function (el, idx) {
    // let keyCode = el.getAttribute('data-key').split(',')[0] || el.getAttribute('data-key').split(',')[1];
    // console.log( keyCode )
    // window.addEventListener('keydown',function( event ){
    // });
    el.addEventListener('mousedown', function (event) {
      isDigit($hddigit, this.textContent);
      isDigit($hdcal, this.textContent);
      isCalculate(this);
      calw = $hdcal.clientWidth;
      textSize(calw);
    });
  });
})();