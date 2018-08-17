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
		const allGames = JSON.parse(body);
		if (allGames.length === 0) {
			done(null, allGames.length);
		} else {
			done(null, allGames.length + 1);
		}
	});
}

function compareCards(game, card) {

}


module.exports = {
	parseBody,
	getGameID,
	compareCards
}