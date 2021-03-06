"use strict";

// (function() {
//   let $main = document.querySelector('.main');
//   for (let i = 2; i <= 9; i++) {
//     let $block = document.createElement('div'),
//       $num = document.createElement('div'),
//       $cal = document.createElement('div'),
//       numtext = document.createTextNode(i);
//     $block.classList.add('ninetable');
//     $num.classList.add('num');
//     $cal.classList.add('cal');
//     $num.appendChild(numtext);
//     $block.appendChild($num);
//     $block.appendChild($cal);
//     $main.appendChild($block);
//     for (let j = 1; j <= 9; j++) {
//       let $item = document.createElement('span');
//       let itemtext = document.createTextNode(`${i} X ${j} = ${i * j}`);
//       $item.appendChild(itemtext);
//       $cal.appendChild($item);
//     }
//   }
// })();
(function () {
  var str = '';

  for (var i = 2; i <= 9; i++) {
    str += '<div class="ninetable">';
    str += '<div class="num">' + i + '</div>';
    str += '<div class="cal">';

    for (var j = 1; j <= 9; j++) {
      str += '<span>' + i + 'X' + j + '=' + i * j + '</span>';
    }

    str += '</div>';
    str += '</div>';
  }

  document.querySelector('.main').insertAdjacentHTML('beforeend', str);
})();