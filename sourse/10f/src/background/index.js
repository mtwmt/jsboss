// OnInstall handler
chrome.runtime.onInstalled.addListener(details => {
  console.log('onInstalled',details)
  

})

// chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
//   console.log( 'runtime.onMessage',request, sender, sendRequest)
// });

// chrome.runtime.onInstalled.addListener(function() {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { hostEquals: 'newtab' }
//           })
//         ],
//         actions: [new chrome.declarativeContent.ShowPageAction()]
//       }
//     ]);
//   });
// });