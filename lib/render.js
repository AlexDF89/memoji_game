const fs = require('fs');
const path = require('path');

function render (templateName, data) {
	fs.readFile(path.resolve('views', templateName), 'utf-8', (error, template) => {
		if (error) {
			this.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
			return this.end(error.message);
		}

		let html = template;

		if (data) {
			html = template.replace(/{{([^{}]*)}}/g, (placeholder, property) => {
				const match = data[property];
				return (match === 0 ? match : (match || placeholder));
			});					
		}

		this.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		this.end(html);

	});
}

module.exports = render;