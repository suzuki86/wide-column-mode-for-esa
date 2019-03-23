window.addEventListener('load', setCurrentButtonText);
window.addEventListener('load', switchEnablement);

function setCurrentButtonText() {
  var config;
  chrome.storage.local.get('enablement', function(config){
    if(config.enablement === 'true') {
      document.getElementById('switcher').innerText = 'Disabled';
    } else {
      document.getElementById('switcher').innerText = 'Enabled';
    }
  });
}

function switchEnablement() {
  var config;
  document.getElementById('switcher').addEventListener('click', function(){
    chrome.storage.local.get('enablement', function(config){
      if(config.enablement === 'true') {
        chrome.storage.local.set({'enablement': 'false'});
        setButtonText('Enabled');
        chrome.tabs.query({}, function(tabs){
          tabs.forEach(function(tab){
            chrome.tabs.sendMessage(tab.id, 'runHandleEnablement');
          });
        });
      } else {
        chrome.storage.local.set({'enablement': 'true'});
        setButtonText('Disabled');
        chrome.tabs.query({}, function(tabs){
          tabs.forEach(function(tab){
            chrome.tabs.sendMessage(tab.id, 'runHandleEnablement');
          });
        });
      }
    });
  });
}

function setButtonText(text) {
  document.getElementById('switcher').innerText = text;
}

