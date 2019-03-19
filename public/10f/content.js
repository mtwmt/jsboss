"use strict";

(function () {
  console.log('content3.js');

  var $body = document.querySelector('body'),
      initDom = document.createElement("div"),
      $switch,
      turnOnThePageAction = function turnOnThePageAction() {
    //向擴充功能(事件腳本)發出請求
    chrome.runtime.sendMessage({
      name: '開啟頁面按鈕'
    }, function (response) {
      console.log(response);
    });
  },
      turnOffThePageAction = function turnOffThePageAction() {
    //向擴充功能(事件腳本)發出請求
    chrome.runtime.sendMessage({
      name: '關閉頁面按鈕'
    }, function (response) {
      console.log(response);
    });
  }; // chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {  
  //   //注意如果有callback要使用call的方式呼叫方法  
  //   _this.switchView.call(_this, function(){  
  //     sendResponse("操作完成")  
  //   });  
  // });  


  initDom.id = 'wrap';
  initDom.style.position = "absolute";
  initDom.style.zIndex = "999";
  initDom.innerHTML += "\n    <div data=\"checkbox-switch\">\n      cilck ME!\n      <input type=\"checkbox\" id=\"switch\"/>\n      <label for=\"switch\"></label>\n    </div>";
  $body.appendChild(initDom);
  $switch = document.querySelector('#switch');
  $switch.addEventListener('change', function (e) {
    console.log('$switch', e, this.checked);

    if (this.checked === true) {
      turnOnThePageAction();
    } else {
      turnOffThePageAction();
    }
  });
})();