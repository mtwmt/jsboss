"use strict";

(function () {
  var createPoint = function createPoint() {
    var $hourpoint = document.querySelector('.dumpling'),
        amhourtxt = 1,
        pmhourtxt = 13; // 共有72個刻度 360/72=5

    for (var i = 0, j = 5; i < 72; i++) {
      var $point = document.createElement('div'),
          $am = void 0,
          $pm = void 0,
          amtxt = void 0,
          pmtxt = void 0,
          posy = void 0;

      if (i % 6 == 3) {
        posy = 114;
      } else if (i % 6 == 0) {
        posy = 110;
        $am = document.createElement('span');
        $pm = document.createElement('span');
        $am.classList.add('am');
        $pm.classList.add('pm');
        amtxt = document.createTextNode(amhourtxt++);
        pmtxt = document.createTextNode(pmhourtxt++);
        $am.appendChild(amtxt);
        $pm.appendChild(pmtxt);
        $am.setAttribute('style', "transform:rotate(" + (180 - i * j) + "deg) ");
        $pm.setAttribute('style', "transform:rotate(" + (180 - i * j) + "deg) ");
        $point.appendChild($am);
        $point.appendChild($pm);
      } else {
        posy = 120;
      }

      $point.classList.add('pointer');
      $point.setAttribute('style', "transform:rotate(" + (i * j + 180) + "deg) translateY(" + posy + "px)");
      $hourpoint.appendChild($point);
    }
  };

  createPoint();

  var secHand = document.querySelector('.hand-sec'),
      minsHand = document.querySelector('.hand-min'),
      hourHand = document.querySelector('.hand-hour'),
      setDate = function setDate() {
    var now = new Date();
    var seconds = now.getSeconds() === 0 ? 60 : now.getSeconds();
    var secondsDegrees = seconds / 60 * 360 + 180;
    secHand.style.transform = "rotate( " + secondsDegrees + "deg )";
    var mins = now.getMinutes() === 0 ? 60 : now.getMinutes();
    var minsDegrees = mins / 60 * 360 + 180;
    minsHand.style.transform = "rotate( " + minsDegrees + "deg )";
    var hour = now.getHours() === 0 ? 12 : now.getHours();
    var hourDegrees = hour / 12 * 360 + 180;
    hourHand.style.transform = "rotate( " + hourDegrees + "deg )";
  };

  setInterval(setDate, 1000);
  setDate();
})();