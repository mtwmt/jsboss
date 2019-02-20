"use strict";

(function () {
  var $hd = document.querySelector('.cal-header'),
      $hdformula = document.querySelector('.formula'),
      $hdresult = document.querySelector('.result'),
      $num = document.querySelectorAll('.cal-body span'),
      calw,
      tempFormula = [],
      tempResult = [],
      flag = '',
      calboxW = $hd.clientWidth - 40,
      textSize = function textSize(textW) {
    var fz = parseInt($hdresult.style.fontSize, 10);

    while (textW > calboxW) {
      fz -= 2;
      $hdresult.style.fontSize = fz + "px";
      textW = $hdresult.clientWidth;
    }
  },
      isNumber = function isNumber(obj) {
    return parseFloat(obj);
  },
      toPrice = function toPrice(num) {
    if (!isNumber(num)) {
      return num;
    }

    num = String(num);

    if (num.length > 3) {
      return num.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    } else {
      return num;
    }
  },
      isCalc = function isCalc(event) {
    var cls = void 0,
        textCont = void 0;

    if (event.type == 'keydown') {
      cls = document.querySelector("[data-key=\"" + event.key + "\"]").classList.value;
      textCont = document.querySelector("[data-key=\"" + event.key + "\"]").textContent;
    } else if (event.type === 'mousedown') {
      cls = this.classList.value;
      textCont = this.textContent;
    }

    switch (cls) {
      case 'num':
        if (flag === 'clear') {
          flag = '';
          tempFormula = [];
          tempResult = [];
        }

        if (flag === 'func') {
          flag = '';
          tempResult = [];
        }

        if (!tempResult.length && textCont == 0) return;
        tempFormula.push(textCont);
        tempResult.push(textCont);
        break;

      case 'oper':
        if (flag === 'func') return;
        flag = 'func';
        tempFormula.push(textCont);
        break;

      case 'dot':
        if (tempFormula.indexOf('.') >= 0 || tempResult.indexOf('.') >= 0) return;

        if (!tempResult.length) {
          tempFormula.push(0);
          tempResult.push(0);
        }

        tempFormula.push(textCont);
        tempResult.push(textCont);
        break;

      case 'sum':
        var arr = [];
        flag = 'clear';
        tempFormula.map(function (e, i) {
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

        if (RegExp(/\+|-|\*|\/$/).test(arr[arr.length - 1])) {
          tempFormula.length = tempFormula.length - 1;
          arr.length = arr.length - 1;
        }

        ;
        if (!tempFormula.length) return;
        tempResult = [Math.round(eval(arr.join('')) * 100) / 100];
        break;

      case 'clear':
        flag = 'clear';
        tempFormula = [];
        tempResult = [];
        break;

      default:
        break;
    }

    $hdformula.textContent = tempFormula.join('') || 0;
    $hdresult.textContent = toPrice(tempResult.join('')) || 0;
    calw = $hdresult.clientWidth;
    textSize(calw);
  };

  window.addEventListener('keydown', isCalc);
  $num.forEach(function (el, idx) {
    el.addEventListener('mousedown', isCalc);
  });
})();