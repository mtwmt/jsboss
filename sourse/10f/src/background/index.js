// OnInstall handler
chrome.runtime.onInstalled.addListener(details => {
  console.log('onInstalled',details)
  

})

chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
  console.log( 'runtime.onMessage',request, sender, sendRequest)
});