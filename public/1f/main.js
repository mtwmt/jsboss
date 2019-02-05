"use strict";

(function () {
  var $main = document.querySelector('.main');

  for (var i = 2; i <= 9; i++) {
    var $block = document.createElement('div'),
        $num = document.createElement('div'),
        $cal = document.createElement('div'),
        numtext = document.createTextNode(i);
    $block.classList.add('ninetable');
    $num.classList.add('num');
    $cal.classList.add('cal');
    $num.appendChild(numtext);
    $block.appendChild($num);
    $block.appendChild($cal);
    $main.appendChild($block);

    for (var j = 1; j <= 9; j++) {
      var $item = document.createElement('span');
      var itemtext = document.createTextNode(i + " X " + j + " = " + i * j);
      $item.appendChild(itemtext);
      $cal.appendChild($item);
    }
  }
})();