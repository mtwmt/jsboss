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
      $paint = document.querySelectorAll('.paint'),
      $pencolor = document.querySelector('.pencolor input'),
      $pensize = document.querySelectorAll('.pensize input'),
      $btnTop = document.querySelector('.topbar button'),
      $btnBtm = document.querySelector('.bottombar button'),
      // $textarea = document.createElement('textarea'),
  $square = document.createElement('div'),
      pnecolor = $pencolor.value,
      pensize = document.querySelector('.pensize input[type="select"]').value,
      history = [],
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
      } else if (el.className.includes('square')) {
        $canvas.parentNode.appendChild($square);
      }
    });
  },
      drawMove = function drawMove(e) {
    if (e.offsetX > $canvas.width || e.offsetY > $canvas.height) {
      status = false;
      return;
    }

    if (!status) return; // draw

    document.querySelectorAll('.is-active').forEach(function (el) {
      if (el.className.includes('square')) {
        $square.style = "\n          position:absolute; z-index:999;\n          top:" + (e.offsetY < posY ? e.offsetY : posY) + "px;\n          left:" + (e.offsetX < posX ? e.offsetX : posX) + "px;\n          width: " + Math.abs(e.offsetX - posX) + "px;\n          height: " + Math.abs(e.offsetY - posY) + "px; \n          background:" + pnecolor + ";\n        ";
      } else {
        ctx.beginPath();
        ctx.moveTo(posX, posY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        posX = e.offsetX;
        posY = e.offsetY;
      }
    });
  },
      drawEnd = function drawEnd(e) {
    status = false;
    document.querySelectorAll('.is-active').forEach(function (el) {
      if (el.className.includes('square')) {
        $square.remove();
        ctx.fillStyle = pnecolor;
        ctx.fillRect(posX, posY, e.offsetX - posX, e.offsetY - posY);
      }
    });
    posX = e.offsetX;
    posY = e.offsetY;

    if (step < history.length - 1) {
      history.length = step + 1;
    }

    history.push($canvas.toDataURL());
    step = history.length - 1;
  },
      creatImg = function creatImg(step) {
    var img = new Image();
    img.src = history[step];

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
    creatImg(history.length - 1);
  },
      load = function load() {
    init();
    ctx.fillRect(0, 0, ww, wh);
    history.push($canvas.toDataURL());
  };

  $save.addEventListener('click', function () {
    var dataURL = $canvas.toDataURL('image/png');
    this.href = dataURL;
    this.setAttribute('download', Date.now());
  });
  $clear.addEventListener('click', function () {
    ctx.clearRect(0, 0, ww, wh);
    ctx.fillStyle = '#E8E8E8';
    ctx.fillRect(0, 0, ww, wh);
  });
  $undo.addEventListener('click', function (e) {
    if (step === 0) return;
    step -= 1;
    creatImg(step);
  });
  $redo.addEventListener('click', function (e) {
    if (step === history.length - 1) return;
    step += 1;
    creatImg(step);
  });
  $paint.forEach(function (el, idx) {
    el.addEventListener('click', function (e) {
      $paint.forEach(function (v, k) {
        if (v.classList.contains('is-active')) {
          v.classList.remove('is-active');
        }

        if (el.className.includes('font')) {
          $canvas.setAttribute('style', 'cursor:text');
        } else if (el.className.includes('eraser')) {
          $canvas.setAttribute('style', 'cursor:crosshair');
        } else {
          $canvas.setAttribute('style', 'cursor:default');
        }
      });
      this.classList.add('is-active');
    });
  });
  $pencolor.addEventListener('change', function (e) {
    pnecolor = this.value;
  });
  $pensize.forEach(function (el) {
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
  window.addEventListener('mouseup', drawEnd); // window.addEventListener('keydown', function(e){
  //   ctx.fillStyle = pnecolor;
  //   ctx.font = `${pensize}px Arial`;
  //   ctx.fillText( $textarea.value,posX,posY);
  //   // console.log( fontPosX,fontPosY )
  // });
  // window.addEventListener('keyup', function(e){
  //   $textarea.remove();
  // });

  document.querySelector('.topbar').addEventListener('mouseup', soptMouseupEvent);
  document.querySelector('.bottombar').addEventListener('mouseup', soptMouseupEvent);
  window.addEventListener('load', load);
  window.addEventListener('resize', resize);
})(); // http://www.w3school.com.cn/tags/html_ref_canvas.asp