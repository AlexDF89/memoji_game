window.onload = function() {

	const url = "game";
	const request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.send();
	request.onreadystatechange = function() {
		if ( request.readyState == 4 ) {
			console.log(request.responseText);
		}
	}

	const field = new Field(cardBlanks);
	field.createField().createTimer();
}