"use strict";

(function () {
  var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      init = function init() {
    var ww = canvas.width = window.innerWidth > 1280 ? 1280 : window.innerWidth,
        wh = canvas.height = window.innerHeight > 800 ? 800 : window.innerHeight;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.fillStyle = '#ffcccc';
    ctx.strokeRect(0, 0, ww, wh);
  };

  ctx.beginPath();
  ctx.strokeStyle = '#159';
  ctx.moveTo(0, 0);
  ctx.lineTo(1280, 800);
  ctx.moveTo(1280, 0);
  ctx.lineTo(0, 800);
  ctx.stroke(); //   canvas.width

  console.log(canvas.width, canvas.clientHeight, window.innerWidth, window.innerHeight);
  window.addEventListener('load', init);
  window.addEventListener('resize', init);
})();