window.onload = function() {

	const field = document.getElementById('field');
	const gameID = field.dataset.gameId;

	const url = "getCardsOfField";
	const request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.send(gameID);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 ) {
			const game = JSON.parse(request.responseText);
			createField(game.playingCards);
			createTimer(game.timeOfGame);
			createHandler();
		}
	}
}

const createField = playingCards => {
	const field = document.getElementById('field');
	playingCards.forEach(elem => {
		const li = createCardElement(elem);
		field.appendChild(li);
	});

}
const createCardElement = cardBlank => {
	const li = document.createElement('li');
	const shirt = document.createElement('div');
	shirt.classList.add('shirt');
	li.appendChild(shirt);
	const emotion = document.createElement('div');
	emotion.classList.add('emotion');
	emotion.innerHTML = cardBlank.image;
	li.appendChild(emotion);
	li.position = cardBlank.position;
	return li;
}

const createTimer = timeOfGame => {
	const timer = document.getElementById('timer');
	let minutes = Math.floor(timeOfGame/60);
	if (minutes > 10) minutes = 10;
	if (minutes < 10) minutes = '0' + minutes;
	let seconds = timeOfGame%60;
	if (seconds < 10) seconds = '0' + seconds;

	timer.innerHTML = minutes + ':' + seconds;
}

const createHandler = () => {

	const field = document.getElementById('field');
	const gameID = field.dataset.gameId;

	field.addEventListener('click', function(e) {

		const elem = e.target.parentNode;
		const data = JSON.stringify([ elem.position, gameID ]);

		if (elem.classList.contains('opened')) return;
		if (elem.classList.contains('freezeErr')) return;
		if (elem.classList.contains('open')) return;
		elem.classList.toggle('open');
		const url = 'compareCards';
		const request = new XMLHttpRequest();
		request.open("POST", url, true);
		request.send(data);
		request.onreadystatechange = () => {
			if ( request.readyState === 4 ) {
				const response = JSON.parse(request.responseText);
				let listLi;
				switch (response[0]) {
					case 'open':
						break;

					case 'freeze':
						listLi = field.querySelectorAll('li');
						listLi.forEach(val => {
							if (val.position === response[1] || val.position === response[2]) {
								val.classList.add('freeze', 'opened');
								val.classList.remove('open');
							}
						});						
						break;

					case 'freezeErr':
						if (response.length === 3) break;
						listLi = field.querySelectorAll('li');
						listLi.forEach(val => {
							if (val.classList.contains('open') && val !== elem) {
								val.classList.remove('freezeErr','open');
							}
						});
						break;
				}
			}
		}

	});

}