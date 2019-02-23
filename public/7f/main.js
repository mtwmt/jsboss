"use strict";

(function () {
  var $main = document.querySelector('.main'),
      $canvas = document.querySelector('canvas'),
      ctx = $canvas.getContext('2d'),
      status = false,
      posX,
      posY,
      ww = 1280,
      wh = 600,
      $save = document.querySelector('.save'),
      $clear = document.querySelector('.clear'),
      canvasData = [],
      draw = function draw(e) {
    if (e.offsetX > $canvas.width || e.offsetY > $canvas.height) {
      status = false;
      return;
    }

    if (!status) return; // setting

    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#159'; // draw

    ctx.beginPath();
    ctx.moveTo(posX, posY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    posX = e.offsetX;
    posY = e.offsetY; // console.log(e.offsetX,e.offsetY )
  },
      init = function init() {
    var ww = $canvas.width = window.innerWidth > 980 ? 1280 : window.innerWidth,
        wh = $canvas.height = window.innerHeight > 800 ? 800 : window.innerHeight; // ctx.lineJoin = 'round'
    // ctx.lineCap = 'round'
    // ctx.fillStyle = '#ffcccc';

    ctx.strokeRect(0, 0, ww, wh);
  };

  $main.width = ww;
  $main.height = wh;
  $canvas.width = ww;
  $canvas.height = wh;
  ctx.fillStyle = '#E8E8E8';
  ctx.fillRect(0, 0, ww, wh); // window.addEventListener('load', init)
  // window.addEventListener('resize', init)
  // ctx.lineCap = 'round';
  // ctx.lineWidth = 20;
  // ctx.beginPath();
  // ctx.strokeStyle = '#159';
  // ctx.moveTo( 20,20 );
  // ctx.lineTo( 20, 30 );
  // ctx.moveTo( 1000, 20 );
  // ctx.lineTo( 20, 500 );
  // ctx.stroke();

  $save.addEventListener('click', function () {
    var dataURL = $canvas.toDataURL('image/png');
    this.href = dataURL;
  });
  $clear.addEventListener('click', function () {
    ctx.fillStyle = '#E8E8E8';
    ctx.fillRect(0, 0, ww, wh);
  });
  $canvas.addEventListener('mousedown', function (e) {
    if (status) return;
    status = true;
    posX = e.offsetX;
    posY = e.offsetY;
  });
  window.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', function (e) {
    status = false;
    posX = e.offsetX;
    posY = e.offsetY;
    canvasData = $canvas.toDataURL();
  });
})();