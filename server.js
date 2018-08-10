const http = require('http');

const render = require('./lib/render');
const {} = require('./routes');
http.ServerResponse.prototype.render = render;

http.createServer((req, res) => {
	if (req.url.match(/\.(html|css|js)/)) {
		public(req, res);
	} else if (req.url === '/game') {
		startGame(req, res);
	} else {
		notFound(req, res);
	}
}).listen(3000, () => console.log('Сервер работает'))