function createRequestObject() {
	var xmlhttp;
	try {
		xmlhttp = new ActiveXObject ('Microsoft.XMLHTTP');
	} catch (err) {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}
 
function sndReqPhrase(inputID, outputID) {
	var phrase = document.getElementById(inputID).value;
	
	if (phrase.length >= 2) {
		xmlhttp = createRequestObject();
		xmlhttp.open ('get', url + phrase);
		xmlhttp.onreadystatechange = function () { return handleResponseAutoCompleter(xmlhttp, inputID, outputID); };
		xmlhttp.send (null);
	}
	document.getElementById(outputID).style.visibility = 'hidden';
}
 
function handleResponseAutoCompleter(xmlhttp, inputID, outputID) {
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var suggestions = xmlhttp.responseXML.getElementsByTagName(outputID);
		
		if (suggestions.length > 0) {
		
			var output='<ul class="autocomplete">';
			
			for(i = 0; i < suggestions.length; i++) {
				var suggestion = suggestions[i].firstChild.nodeValue;
				output += '<li class="suggestion" onmousedown="setSuggestion(\'' + suggestion + '\', \'' + inputID + '\', \'' + outputID + '\')">' + suggestion + '</li>';
			}
			document.getElementById(outputID).innerHTML = output + '</ul>';
			document.getElementById(outputID).style.visibility = 'visible';
		} else {
			document.getElementById(outputID).style.visibility = 'hidden';
		}
	}
}
 
function setSuggestion(suggestion, inputID, outputID) {
	document.getElementById(inputID).value = suggestion;
	document.getElementById(outputID).style.visibility = 'hidden';
}
