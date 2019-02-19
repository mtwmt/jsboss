(function () {
  var $hd = document.querySelector('.cal-header'),
      $hdformula = document.querySelector('.formula'),
      $hdresult = document.querySelector('.result'),
      $num = document.querySelectorAll('.cal-body span'),
      $sum = document.querySelector('.sum'),
      calw,
      tempFormula = [],
      tempResult = [],
      flag = false,
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
    return parseFloat( obj );
  },
  toPrice = function( num ){
    if (!isNumber(num)) {
      return num;
    }
    num = String(num);
    if (num.length > 3) {
      return num.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }else{
      return num;
    }
  },
  isCalc = function( event ){
    
    let cls,
        textCont;

    if( event.type == 'keydown' ){
      cls = document.querySelector( `[data-key="${ event.key }"]` ).classList.value;
      textCont = document.querySelector( `[data-key="${ event.key }"]` ).textContent;
      
    }else if( event.type === 'mousedown' ){
      cls = this.classList.value;
      textCont = this.textContent
    }

    switch ( cls ) {
      case 'num' :
        if( flag ){
          flag = false;
          tempFormula = [];
          tempResult = [];
        }
        if( !tempResult.length && textCont == 0 ) return;

        tempFormula.push( textCont );
        tempResult.push( textCont );

        break;
      case 'oper':
        if( !tempResult.length ) return;
        tempFormula.push( textCont );
        // tempResult = [];
        break;
      case 'dot':
        console.log( 'dot',tempResult.indexOf('.') )
        if( tempFormula.indexOf('.') >= 0 || tempResult.indexOf('.') >= 0 ) return;
        if( !tempResult.length ){
          tempFormula.push( 0 );
          tempResult.push( 0 );
        }
        tempFormula.push( textCont );
        tempResult.push( textCont );
        break;
      case 'sum':
        let arr = [];
        flag = true;
        tempFormula.map(function (e,i) {
          if (e === '÷') {
            e = '/';
          } else if (e === '×') {
            e = '*';
          } else if (e === '−') {
            e = '-';
          } else if (e === '+') {
            e = '+';
          }
          arr.push( e )
        });

        if( RegExp(/\+|-|\*|\/$/).test( arr[ arr.length - 1 ] ) ){
          tempFormula.length = tempFormula.length - 1;
          arr.length = arr.length - 1; 
        };

        console.log( tempFormula )
        if( !tempFormula.length ) return;
        tempResult = [ Math.round(eval( arr.join(''))*100) / 100];

        break;
      case 'clear':
        flag = false;
        tempFormula = [];
        tempResult = [];
        break;
      default:
        break;
    }

    $hdformula.textContent = tempFormula.join('') || 0;
    $hdresult.textContent = toPrice(tempResult.join('')) || 0;


    calw = $hdresult.clientWidth;      
    textSize( calw )
  };
  // isDigit = function( dom,type ){
    
  //   dom.textContent = (!parseInt(dom.textContent, 10)) ? '' : dom.textContent;
    
  //   if (dom.textContent.length > 0 ){
  //     dom.textContent = dom.textContent + type.replace(/[^0-9]/, '');
  //   }else{
  //     dom.textContent = dom.textContent + type.replace(/[^0-9]/, '0');
  //   }
  // },
  
  window.addEventListener('keydown', isCalc);

  $num.forEach(function( el,idx ){
    // let keyCode = el.getAttribute('data-key').split(',')[0] || el.getAttribute('data-key').split(',')[1];
    // console.log( keyCode )  
    el.addEventListener('mousedown', isCalc);
  });
  
  


})();