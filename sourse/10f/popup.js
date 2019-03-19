(function() {
  var url = '*://github.com/*';
  var $add = document.querySelector('.add');

  var turnOnThePageActio = function() {
      //向擴充功能(事件腳本)發出請求
      chrome.runtime.sendMessage({ name: '開啟頁面按鈕' }, function(response) {
        console.log(response);
      });
    },
    turnOffThePageAction = function() {
      //向擴充功能(事件腳本)發出請求
      chrome.runtime.sendMessage({ name: '關閉頁面按鈕' }, function(response) {
        console.log(response);
      });
    };

  //利用 tabs.query api 查找畫面上的所有tab
  // function queryTabsAndShowPageActions(queryObject) {
  //   console.log('queryObject', queryObject);

  //   chrome.tabs.query(queryObject, function(tabs) {
  //     if (tabs && tabs.length > 0) {
  //       for (var i = 0; i < tabs.length; i++) {
  //         //在加載完畢的tab上，使用chrome.pageAction.show 啟用按鈕
  //         if (tabs[i].status === 'complete') chrome.pageAction.show(tabs[i].id);
  //       }
  //     }
  //   });
  // }

  // //第一次的初始化
  // chrome.runtime.onInstalled.addListener(function() {
  //   console.log('init');
  //   // queryTabsAndShowPageActions({
  //   //   active: false,
  //   //   currentWindow: true,
  //   //   url: url,
  //   // });
  // });

  // chrome.runtime.sendMessage({ name: '開啟頁面按鈕' }, function(response) {
  //   console.log(response);
  // });

  // //每次tab有變動，檢查現在這個current tab是否在指定的 url pattern底下
  // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  //   console.log('tabId', tabId, 'changeInfo', changeInfo, 'tab', tab);

  //   // queryTabsAndShowPageActions({
  //   //   active: true,
  //   //   currentWindow: true,
  //   //   url: url,
  //   // });
  // });

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message.name);

    switch (message.name) {
      case '開啟頁面按鈕':
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          console.log(tabs);
          chrome.pageAction.show(tabs[0].id);
        });
        break;
      case '關閉頁面按鈕':
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          console.log(tabs);
          chrome.pageAction.hide(tabs[0].id);
        });
        break;
      default:
        break;
    }

    sendResponse('來自事件腳本的回覆：處理已送出');
  });

  document.addEventListener('DOMContentLoaded', function(dcle) {
    $add.addEventListener('click', function(e) {
      console.log(e);
      turnOnThePageActio();

      //使用Chrome API開啟視窗
      // chrome.windows.create({ "url": "https://github.com/mtwmt" });
    });
  });
})();
