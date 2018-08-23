const fs = require('fs');
const path = require('path');

function parseBody(body) {
	const result = {};
	const keyValuePairs = body.split('&');
	keyValuePairs.forEach(keyValue => {
		const [key, value] = keyValue.split('=');
		result[key] = value;
	});
	return result;
}
function getGameID(done) {

	let body = '';

	const readStream = fs.createReadStream(path.join(__dirname, '../allGames.json'));
	readStream.on('data', part => body += part);
	readStream.on('end', ()=> {

		let allGames = JSON.parse(body);
		done(null, allGames.length);
	});
}

function checkWin(game) {
	const filt = game.playingCards.filter(elem => {
		if (elem.open !== 'freeze') return true;
	});

	if (filt.length) return false;

	return true;
}

function createField(cards) {
	let result = '';

	for (let i = 0; i < cards.length; i++) {
		result += `<li data-position='${cards[i].position}'>
										<div class='shirt'>
										</div>
										<div class='emotion'>
											${cards[i].image}
										</div>
									</li>`;
	}

	return result;
}

function createTimer(time) {
	let result = '';

	let minutes = Math.floor(time/60);
	if (minutes > 10) minutes = 10;
	if (minutes < 10) minutes = '0' + minutes;
	let seconds = time%60;
	if (seconds < 10) seconds = '0' + seconds;

	result = minutes + ':' + seconds;

	return result;
}

module.exports = {
	parseBody,
	getGameID,
	checkWin,
	createField,
	createTimer
}