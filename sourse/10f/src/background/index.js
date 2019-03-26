// OnInstall handler
chrome.runtime.onInstalled.addListener(details => {
  console.log(details)
  

})

// chrome.runtime.onInstalled.addListener(function() {
//   // chrome.storage.sync.set({ color: '#3aa757' }, function (e) {
//   //   console.log("The color is green.",e);
//   // });

//   chrome.storage.sync.set({'value': 'msg'}, function() {
//     // 通知保存完成。
//     message('设置已保存');
//   });
// });
