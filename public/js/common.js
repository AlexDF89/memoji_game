window.onload = function() {

	const field = document.getElementById('field');
	const gameID = field.dataset.gameId;

	const url = "createField";
	const request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.send(gameID);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 ) {
			console.log(request.responseText);
		}
	}

	//const field = new Field(cardBlanks);
	//field.createField().createTimer();
}