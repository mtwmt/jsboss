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
      $eraser = document.querySelector('.eraser'),
      $pen = document.querySelector('.pen'),
      $pencolor = document.querySelector('.pencolor input'),
      $pensize = document.querySelectorAll('.pensize input'),
      $btnTop = document.querySelector('.topbar button'),
      $btnBtm = document.querySelector('.bottombar button'),
      pnecolor = $pencolor.value,
      pensize = document.querySelector('.pensize input[type="text"]').value,
      canvasData = [],
      step = 0,
      drawStart = function drawStart(e) {
    if (status) return;
    status = true;
    posX = e.offsetX;
    posY = e.offsetY; // setting

    ctx.lineWidth = pensize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = pnecolor;
    document.querySelectorAll('.is-active').forEach(function (el) {
      if (el.className.includes('eraser')) {
        ctx.lineWidth = parseInt(pensize, 10) * 10;
        ctx.lineCap = 'square';
        ctx.strokeStyle = '#E8E8E8';
      }
    });
  },
      drawMove = function drawMove(e) {
    if (e.offsetX > $canvas.width || e.offsetY > $canvas.height) {
      status = false;
      return;
    }

    if (!status) return; // draw

    ctx.beginPath();
    ctx.moveTo(posX, posY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    posX = e.offsetX;
    posY = e.offsetY;
  },
      drawEnd = function drawEnd(e) {
    status = false;
    posX = e.offsetX;
    posY = e.offsetY;

    if (step < canvasData.length - 1) {
      canvasData.length = step + 1;
    }

    canvasData.push($canvas.toDataURL());
    step = canvasData.length - 1;
  },
      creatImg = function creatImg(step) {
    var img = new Image();
    img.src = canvasData[step];

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
  },
      soptMouseupEvent = function soptMouseupEvent(e) {
    e.stopPropagation();
  },
      init = function init() {
    ww = window.innerWidth;
    wh = window.innerHeight;
    $main.style.width = ww + 'px';
    $main.style.height = wh + 'px';
    $canvas.width = ww;
    $canvas.height = wh;
    ctx.fillStyle = '#E8E8E8';
  },
      resize = function resize() {
    init();
    ctx.fillRect(0, 0, ww, wh);
    creatImg(canvasData.length - 1);
  },
      load = function load() {
    init();
    ctx.fillRect(0, 0, ww, wh);
    canvasData.push($canvas.toDataURL());
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
  });
  $redo.addEventListener('click', function (e) {
    if (step === canvasData.length - 1) return;
    step += 1;
    creatImg(step);
  });
  $eraser.addEventListener('click', function (e) {
    this.classList.toggle('is-active');

    if (this.className.includes('is-active')) {
      $pen.classList.remove('is-active');
    }
  });
  $pen.addEventListener('click', function (e) {
    this.classList.toggle('is-active');

    if (this.className.includes('is-active')) {
      $eraser.classList.remove('is-active');
    } // console.log( this.className.includes('eraser') )

  });
  $pencolor.addEventListener('change', function (e) {
    pnecolor = this.value;
  });
  $pensize.forEach(function (el, idx) {
    el.addEventListener('change', function () {
      var _self = this;

      $pensize.forEach(function (element) {
        element.value = _self.value;
        pensize = _self.value;
      });
    });
  });
  $btnTop.addEventListener('click', function (e) {
    if (this.parentNode.className.indexOf('is-close') >= 0) {
      this.parentNode.className = 'topbar';
      this.childNodes[0].className = 'fas fa-angle-up';
    } else {
      this.parentNode.className = 'topbar is-close';
      this.childNodes[0].className = 'fas fa-angle-down';
    }
  });
  $btnBtm.addEventListener('click', function (e) {
    this.parentNode.classList.toggle('is-close');
  });
  $btnBtm.parentNode.addEventListener('transitionend', function (e) {
    var _self = this,
        $btn = _self.querySelector('button i');

    if (e.propertyName.includes('width')) {
      if ($btn.className.includes('fa-angle-down')) {
        $btn.className = 'fas fa-paint-brush';
        return;
      } else {
        $btn.className = 'fas fa-angle-down';
        return;
      }
    }
  });
  $canvas.addEventListener('mousedown', drawStart);
  window.addEventListener('mousemove', drawMove);
  window.addEventListener('mouseup', drawEnd);
  document.querySelector('.topbar').addEventListener('mouseup', soptMouseupEvent);
  document.querySelector('.bottombar').addEventListener('mouseup', soptMouseupEvent);
  window.addEventListener('load', load);
  window.addEventListener('resize', resize);
})();