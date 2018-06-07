;window.onload = function() {

	var playingField = document.getElementById('field');
	playingField.addEventListener('click', handler, true);

	var shirts = playingField.querySelectorAll('.shirt');
	Array.prototype.forEach.call(shirts, function(element) {
		element.style.transform = 'rotateY(0deg)';
		element.classList.add('zIndex1');
	});

	var emotions = playingField.querySelectorAll('.emotion');
	Array.prototype.forEach.call(emotions, function(element) {
		element.style.transform = 'rotateY(-180deg)';
		element.classList.add('zIndex0');
	});


	function handler(e) {
		if (e.target.tagName === 'DIV') {

			var parentElement = e.target.parentNode;
			elementFlipAnimation(parentElement);

		}	

	}

	function zIndexToggle(/*Аргументы - элементы DOM*/) {
		Array.prototype.forEach.call(arguments, function(element) {
			if (element.classList.contains('zIndex1')) {
				element.classList.remove('zIndex1');
				element.classList.add('zIndex0');
			} else {
				element.classList.remove('zIndex0');
				element.classList.add('zIndex1');				
			}
		});
	}


	function elementFlipAnimation(element) {

		var shirt = element.querySelector('.shirt');
		var emotion = element.querySelector('.emotion');
		
		var countRotateY = parseInt(shirt.style.transform.match(/\d+/).toString(), 10);
		var originalRotateY = countRotateY;
		
		if (originalRotateY === 0) {
			var interval180 = setInterval(function(){
				var shirtRotateY = shirt.style.transform.match(/\d+/).toString();
				var emotionRotateY = emotion.style.transform.match(/\d+/).toString();
				shirt.style.transform = 'rotateY(' + (parseInt(shirtRotateY,10) + 30) + 'deg)';
				emotion.style.transform = 'rotateY(' + (parseInt(emotionRotateY,10) + 30) + 'deg)';
				countRotateY += 30;
				if (countRotateY === (originalRotateY + 90)) {
					zIndexToggle(shirt, emotion);
				}
				if (countRotateY === (originalRotateY + 180)) {
					clearInterval(interval180);
				}
			}, 30);
		} else if (originalRotateY === 180) {
			var interval180 = setInterval(function(){
				var shirtRotateY = shirt.style.transform.match(/\d+/).toString();
				var emotionRotateY = emotion.style.transform.match(/\d+/).toString();
				shirt.style.transform = 'rotateY(' + (parseInt(shirtRotateY,10) - 30) + 'deg)';
				emotion.style.transform = 'rotateY(' + (parseInt(emotionRotateY,10) - 30) + 'deg)';
				countRotateY -= 30;
				if (countRotateY === (originalRotateY - 90)) {
					zIndexToggle(shirt, emotion);
				}
				if (countRotateY === (originalRotateY - 180)) {
					clearInterval(interval180);
				}
			}, 30);
		}

	}

};