
// toLocaleString 轉換
(function() {
  let $el = document.querySelector('ul'),
    date = new Date(),
    $item = $el.querySelectorAll('li'),
    getAreaInfo = function(area) {
      let time = date.toLocaleString('zh-TW', {
          timeZone: area,
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
        }),
        year = date.toLocaleString('en-US', { timeZone: area, year: 'numeric' }),
        month = date.toLocaleString('en-US', { timeZone: area, month: 'long' }),
        day = date.toLocaleString('en-US', { timeZone: area, day: 'numeric' });

      return {
        time: time,
        year: year,
        month: month,
        day: day,
      };
    },
    template = function(){
      $item.forEach(function(e, i) {
        let zone = e.getAttribute('data-area'),
          info = getAreaInfo(zone),
          dark = (info.time.split(':')[0] >= 18 || info.time.split(':')[0] <= 6 ) ? 'dark': '',
          city = e.getAttribute('data-city');
        let str = '';
        str = `
            <div class="col">
              <div class="city">${ city }</div>
              <div class="date">${ info.day } ${ info.month }. ${ info.year }</div>
            </div>
            <div class="col">
                <div class="time">${ info.time }</div>
            </div>
            `;
        
        e.innerHTML = '';
        e.className = dark;
        e.insertAdjacentHTML('beforeend',str);
      });
    };
    template();
    setInterval(() => {
      template();
    }, 5000);

})();

// timestamp 轉換
// (function() {
//   let $el = document.querySelector('ul'),
//     date = new Date(),
//     localTime = date.getTime(),
//     localOffest = date.getTimezoneOffset()* 60000,  //地區偏移
//     utc = localTime + localOffest,  
//     $item = $el.querySelectorAll('li'),
//     arrMonth = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
//     getAreaInfo = function( area, offest ){
//       let getNow = new Date( utc + (3600000*offest) ),
//           year = getNow.getFullYear(),
//           month = arrMonth[getNow.getMonth()],
//           day = getNow.getDate(),
//           hour = getNow.getHours() > 10 ? getNow.getHours() : '0' + getNow.getHours(),
//           min = getNow.getMinutes() > 10 ? getNow.getMinutes() : '0' + getNow.getMinutes(),
//           time = hour + ':' + min;
//       return {
//         time: time,
//         year: year,
//         month: month,
//         day: day,
//       }
//     },
//     template = function(){
//       $item.forEach(function(e, i) {
//         let zone = e.getAttribute('data-area'),
//           info = getAreaInfo( zone, e.getAttribute('data-offest') ),
//           dark = (info.time.split(':')[0] >= 18 || info.time.split(':')[0] <= 6 ) ? 'dark': '',
//           city = e.getAttribute('data-city');
//         let str = '';
//         str = `
//             <div class="col">
//               <div class="city">${ city }</div>
//               <div class="date">${ info.day } ${ info.month }. ${ info.year }</div>
//             </div>
//             <div class="col">
//                 <div class="time">${ info.time }</div>
//             </div>
//             `;
//         e.innerHTML = '';
//         e.className = dark;
//         e.insertAdjacentHTML('beforeend',str);
//       });
//     };

//     template()
//     setInterval(() => {
//       template();
//     }, 5000);
    
// })();