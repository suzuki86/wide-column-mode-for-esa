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
  document.getElementsByClassName('layout-post__main')[0].style.maxWidth = '100%';
  document.getElementsByClassName('layout-post__main')[0].style.width = '100%';
  document.getElementsByClassName('layout-post__toc toc')[0].style.display = 'none';
}

function disableStyles() {
  document.getElementsByClassName('layout-post__main')[0].style.maxWidth = '890px';
  document.getElementsByClassName('layout-post__main')[0].style.width = '890px';
  document.getElementsByClassName('layout-post__toc toc')[0].style.display = 'block';
}
