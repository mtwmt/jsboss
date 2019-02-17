(function () {
  var $hd = document.querySelector('.cal-header'),
      $hdformula = document.querySelector('.formula'),
      $hdresult = document.querySelector('.result'),
      $num = document.querySelectorAll('.cal-body span'),
      $sum = document.querySelector('.sum'),
      calw,
      tempFormula = [],
      tempResult = [],
      calboxW = $hd.clientWidth - 40,
  textSize = function (textW){
    let fz = parseInt($hdresult.style.fontSize, 10);
    while (textW > calboxW) {
      fz -= 2;
      $hdresult.style.fontSize = `${fz}px`;
      textW = $hdresult.clientWidth;
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
    }else{
      return num;
    }
  };
  // isDigit = function( dom,type ){
    
  //   dom.textContent = (!parseInt(dom.textContent, 10)) ? '' : dom.textContent;
    
  //   if (dom.textContent.length > 0 ){
  //     dom.textContent = dom.textContent + type.replace(/[^0-9]/, '');
  //   }else{
  //     dom.textContent = dom.textContent + type.replace(/[^0-9]/, '0');
  //   }
  // },
  

  $num.forEach(function( el,idx ){
    // let keyCode = el.getAttribute('data-key').split(',')[0] || el.getAttribute('data-key').split(',')[1];
    // console.log( keyCode )
    // window.addEventListener('keydown',function( event ){
      
    // });
    el.addEventListener('mousedown', function (event ){
      
      switch (this.classList.value) {
        case 'num' :
          tempFormula.push( this.textContent );
          tempResult.push( this.textContent );
          break;
        case 'oper':
          if( !tempResult.length ) return;
          
          tempFormula.push( this.textContent );
          tempResult = [];
          break;
        case 'dot':
          if( tempResult.indexOf('.') > 0 ) return;
          tempFormula.push( this.textContent );
          tempResult.push( this.textContent );
          break;
        case 'sum':
          // let total = $hdresult.textContent.split(' '),
            // arr = [];
          tempFormula.map(function (e,i) {
            if (e === '÷') {
              // e = '/';
              tempFormula.splice(i,1,'/');
              // tempFormula[i].replace(e, '/');
            } else if (e === '×') {
              // e = '*';
              tempFormula.splice(i,1,'*');
            } else if (e === '−') {
              // e = '-';
              tempFormula.splice(i,1,'-');
            } else if (e === '+') {
              // e = '+';
              tempFormula.splice(i,1,'+');
            }
          });
          // $hdformula.textContent = eval(arr.join(''));
          // console.log( tempFormula )
          break;
        case 'clear':
          // $hdformula.textContent = 0;
          // $hdresult.textContent = 0;
          tempFormula = [];
          tempResult = [];
          break;
        default:
          break;
      }
      console.log(tempFormula);
      $hdformula.textContent = tempFormula.join('') || 0;
      $hdresult.textContent = toPrice(tempResult.join('')) || 0;



      // isDigit($hdresult, this.textContent);
      // isDigit($hdformula, this.textContent);

      // isCalculate( this );

      calw = $hdformula.clientWidth;
      textSize( calw )

      
    });
  });
  
  


})();