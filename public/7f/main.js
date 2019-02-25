"use strict";

(function () {
  var $main = document.querySelector('.main'),
      $canvas = document.querySelector('canvas'),
      ctx = $canvas.getContext('2d'),
      status = false,
      posX,
      posY,
      ww,
      wh,
      $save = document.querySelector('.save'),
      $clear = document.querySelector('.clear'),
      $undo = document.querySelector('.undo'),
      $redo = document.querySelector('.redo'),
      canvasData = [],
      step = 0,
      idx,
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
      creatImg = function creatImg(step) {
    var img = new Image();
    img.src = canvasData[step];

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
  },
      init = function init() {
    ww = window.innerWidth;
    wh = window.innerHeight;
    $main.style.width = ww + 'px';
    $main.style.height = wh + 'px';
    $canvas.width = ww;
    $canvas.height = wh;
    ctx.fillStyle = '#E8E8E8';
    ctx.fillRect(0, 0, ww, wh); // let ww = $canvas.width = (window.innerWidth > 980) ? 1280 : window.innerWidth,
    //     wh = $canvas.height = (window.innerHeight > 800) ? 800 : window.innerHeight;
    // ctx.lineJoin = 'round'
    // ctx.lineCap = 'round'
    // ctx.fillStyle = '#ffcccc';
    // ctx.strokeRect(0, 0, ww, wh)
  };

  $save.addEventListener('click', function () {
    var dataURL = $canvas.toDataURL('image/png');
    this.href = dataURL;
  });
  $clear.addEventListener('click', function () {
    ctx.fillStyle = '#E8E8E8';
    ctx.fillRect(0, 0, ww, wh);
  });
  $undo.addEventListener('click', function (e) {
    if (step === 0) return;
    step -= 1;
    creatImg(step);
    console.log('$undo');
  });
  $redo.addEventListener('click', function (e) {
    if (step >= canvasData.length - 1) return;
    step += 1;
    creatImg(step);
    console.log('redo');
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

    if (step < canvasData.length) {
      canvasData.length = step + 1;
    }

    canvasData.push($canvas.toDataURL());
    step = canvasData.length - 1;
  });
  document.querySelector('.topbar').addEventListener('mouseup', function (e) {
    e.stopPropagation();
  });
  document.querySelector('.bottombar').addEventListener('mouseup', function (e) {
    e.stopPropagation();
  });
  window.addEventListener('load', init); // window.addEventListener('resize', function(){
  //   ww = window.innerWidth;
  //   wh = window.innerHeight;
  //   $main.style.width = ww + 'px';
  //   $main.style.height = wh + 'px';
  //   $canvas.width = ww;
  //   $canvas.height = wh;
  // });
})();