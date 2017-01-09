// Saves options to chrome.storage
function save_options() {
	
  var new_default_encoding = document.getElementById('default_encoding').value;
  var new_url_pattern = document.getElementById('url_pattern').value;
  
  chrome.storage.sync.set({
    default_encoding: new_default_encoding,
    url_pattern: new_url_pattern
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Preloads the form with default_encoding and url_pattern stored in chrome.storage.
function restore_options() {
  // Use default default_encoding = 'UTF-8' and '*://*/*'
  chrome.storage.sync.get({
	  default_encoding: 'UTF-8',
	  url_pattern: '*://*/*',
  }, function(items) {
    document.getElementById('default_encoding').value = items.default_encoding;
    document.getElementById('url_pattern').value = items.url_pattern;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);



























