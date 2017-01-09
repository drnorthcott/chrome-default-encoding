/*
 * chrome-default-encoding
 * 
 * background.js
 * 		Adds a listener to onHeadersRecieved to convert all meta tags with content-type=text/html 
 *      to add/override charset=utf8.
 *      
 *      uses google storage api for extensions to save the url pattern and default encoding you want to set
 *      
 *      if a meta tag already specifies an encoding it is not overridden
 * 
 */

var default_encoding = 'utf8'
var url_pattern		 = '*://*/*'

function load_configs() {
	chrome.storage.sync.get({
		  default_encoding: 'UTF-8',
		  url_pattern: '*://*/*',
	}, function(configs){
		default_encoding = configs.default_encoding;
		url_pattern      = configs.url_pattern;
	})
}

var initialize_configs = load_configs();
chrome.storage.onChanged.addListener(load_configs)

chrome.webRequest.onHeadersReceived.addListener(function(details){
    for(var i = 0; i < details.responseHeaders.length; ++i)
        if( details.responseHeaders[i].name.toLowerCase() == 'content-type' && 
        	details.responseHeaders[i].value.includes('text/html') && 
        	!details.responseHeaders[i].value.includes('charset') )        {
	
		    new_val = `text/html; charset=${default_encoding}`
			console.log("%s: Exchanging '%s' with '%s'", i, details.responseHeaders[i].value, new_val);
	        details.responseHeaders[i].value = new_val;
	        
        }
    return {responseHeaders:details.responseHeaders};
    }, {urls: [url_pattern]}, ['blocking', 'responseHeaders']);
	
	


