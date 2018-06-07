;window.onload = function() {

	var playingField = document.getElementById('field');
	playingField.addEventListener('click', handler, true);

	function handler(e) {
		if (e.target.tagName === 'DIV') {

			var parentElement = e.target.parentNode;
			parentElement.classList.toggle('open');

		}	

	}

};