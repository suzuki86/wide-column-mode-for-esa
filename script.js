chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if(request == 'runHandleEnablement') {
    handleEnablement();
  }
});
window.addEventListener('load', handleEnablement);

function handleEnablement() {
  chrome.storage.local.get('enablement', function(config){
    console.log(config.enablement);
    if(config.enablement == 'true') {
      console.log('Enabling styles.');
      enableStyles();
    } else {
      console.log('Disabling styles.');
      disableStyles();
    }
  });
}

function enableStyles() {
  document.getElementsByClassName('main-column')[0].style.maxWidth = '100%';
  document.getElementsByClassName('main-column')[0].style.width = '100%';
  document.getElementsByClassName('right-column')[0].style.display = 'none';
}

function disableStyles() {
  document.getElementsByClassName('main-column')[0].style.maxWidth = '800px';
  document.getElementsByClassName('main-column')[0].style.width = '800px';
  document.getElementsByClassName('right-column')[0].style.display = 'block';
}
