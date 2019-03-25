(function() {
  var url = '*://github.com/*';
  var $add = document.querySelector('.add');

  document.addEventListener('DOMContentLoaded', function(event) {
    // var dButtonContent = document.getElementById('button');

    //點擊按鈕，向內容腳本發送訊息
    $add.addEventListener('click', function(e) {
      console.log('click');
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        console.log( 'tabs',tabs[0].id )
        chrome.tabs.sendMessage(tabs[0].id, { content: '你好，此訊息來自彈出視窗腳本' }, function(response) {
          console.log(222,response);
        });
      });
    });
  });


})();

// "matches": ["*://www.google.com.tw/*"],
