"use strict";

(function () {
  console.log('event.js');
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(123, message.name);

    switch (message.name) {
      case '開啟頁面按鈕':
        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, function (tabs) {
          console.log(tabs);
          chrome.pageAction.show(tabs[0].id);
        });
        break;

      case '關閉頁面按鈕':
        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, function (tabs) {
          console.log(tabs);
          chrome.pageAction.hide(tabs[0].id);
        });
        break;

      default:
        break;
    }

    sendResponse('來自事件腳本的回覆：處理已送出');
  }); //指定比對的url：不允許片段表達式
  //例如： *://*.google.com.tw/* 作為查詢字串不被接受因為host是一個片段表達式
  // var urlPattern = 'chrome://newtab/';
  // //利用 tabs.query api 查找畫面上的所有tab
  // function queryTabsAndShowPageActions(queryObject) {
  //   chrome.tabs.query(queryObject, function(tabs) {
  //     console.log( 'queryObject',queryObject,'tabs',tabs )
  //     if (tabs && tabs.length > 0) {
  //       for (var i = 0; i < tabs.length; i++) {
  //         //在加載完畢的tab上，使用chrome.pageAction.show 啟用按鈕
  //         if (tabs[i].status === 'complete') {
  //           console.log( 'id',tabs[i].id )
  //           chrome.pageAction.show(tabs[i].id);
  //         }
  //       }
  //     }
  //   });
  // }
  // //第一次的初始化
  // chrome.runtime.onInstalled.addListener(function() {
  //   queryTabsAndShowPageActions({
  //     active: false,
  //     currentWindow: true,
  //     url: urlPattern,
  //   });
  // });
  // //每次tab有變動，檢查現在這個current tab是否在指定的 url pattern底下
  // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  //   console.log( tabId, changeInfo, tab )
  //   queryTabsAndShowPageActions({
  //     active: true,
  //     currentWindow: true,
  //     url: urlPattern,
  //   });
  // });
  // chrome.browserAction.onClicked.addListener(function(tab) {
  //   chrome.tabs.executeScript({
  //     code: 'document.body.style.backgroundColor="red"',
  //   });
  // });
})();