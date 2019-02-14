"use strict";

(function () {
  var $hd = document.querySelector('.cal-header'),
      $hddigit = document.querySelector('.digit'),
      $hdcal = document.querySelector('.cal'),
      $num = document.querySelectorAll('.cal-body span'),
      $sum = document.querySelector('.sum'),
      calw,
      calboxW = $hd.clientWidth - 40,
  textSize = function (textW){
    let fz = parseInt($hdcal.style.fontSize, 10);
    while (textW > calboxW) {
      fz -= 2;
      $hdcal.style.fontSize = `${fz}px`;
      textW = $hdcal.clientWidth;
    }
  },
  isNumber = function (obj) {
    // return (typeof (obj) === 'number');
    return parseFloat( obj );
  },
  toPrice = function( num ){
    console.log( num )
    if (!isNumber(num)) {
      return num;
    }
    
    num = String(num);

    if (num.length > 3) {
      return num.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
  },
  isCalculate = function( dom,type ){
    dom.textContent = (!parseInt(dom.textContent, 10)) ? '' : dom.textContent;
    dom.textContent = dom.textContent + type.replace(/[^0-9+\,]/g,'');
  };


  $num.forEach(function( el,idx ){
    
    // let keyCode = el.getAttribute('data-key').split(',')[0] || el.getAttribute('data-key').split(',')[1];

    // console.log( keyCode )
    // window.addEventListener('keydown',function( event ){
      
    // });
    el.addEventListener('mousedown', function (event ){
        
      isCalculate($hddigit, this.textContent );
      isCalculate($hdcal, this.textContent);

      
      // $hdcal.textContent = toPrice($hdcal.textContent);

      // console.log(123,toPrice($hdcal.textContent) )
      calw = $hdcal.clientWidth;
      textSize( calw )
    });
  })
  


})();