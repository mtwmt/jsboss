(function() {
  var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.strokeStyle = '#159';
  ctx.moveTo( 0,0 );
  ctx.lineTo( 1280, 800 );

  ctx.moveTo( 1280, 0 );
  ctx.lineTo( 0, 800 );
  ctx.stroke();



})();
