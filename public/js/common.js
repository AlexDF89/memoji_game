window.onload = function() {
	createHandler();
}


const createHandler = () => {
	let interval,
			gameStart = false;

	const timer = () => {
		const timer = document.getElementById('timer');
		const text = timer.innerHTML;
		const time = text.split(':');
		let minutes = parseInt(time[0], 10);
				
		if (time[0] > 0) {
			if (time[1] === '00') {
				time[0] = minutes - 1;
				time[1] = '59';
			} else {
				time[0] = minutes;
				time[1] = parseInt(time[1]) - 1;
				if (time[1] < 10) time[1] = '0' + time[1];
				timer.innerHTML = time[0] + ':' + time[1];
			}
			timer.innerHTML = '0' + time[0] + ':' + time[1];
		} else if (parseInt(time[1]) > 0) {
			time[1] = parseInt(time[1]) - 1;
			if (time[1] < 10) time[1] = '0' + time[1];
			timer.innerHTML = time[0] + ':' + time[1];
			if (time[0] === '00' && time[1] === '00') {
				const winLose = document.getElementById('windowLoseWrap');
				clearInterval(interval);
				winLose.style.display = 'block';
			}
		}
	}


	const field = document.getElementById('field');
	const gameID = parseInt(field.dataset.gameId);

	field.addEventListener('click', function(e) {

		if (!gameStart) {
			gameStart = true;
			interval = setInterval(timer, 1000);
		}

		const elem = e.target.parentNode;
		const position = parseInt(e.target.parentNode.dataset.position);
		const data = JSON.stringify([ position, gameID ]);

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
				console.log(response);
				let listLi;
				switch (response[0]) {
					case 'open':
						break;

					case 'freeze':
						listLi = field.querySelectorAll('li');
						listLi.forEach(val => {
							const pos = parseInt(val.dataset.position);
							if (pos === response[1] || pos === response[2]) {
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

					case 'win':
						listLi = field.querySelectorAll('li');
						listLi.forEach(val => {
							const pos = parseInt(val.dataset.position);
							if (pos === response[1] || pos === response[2]) {
								val.classList.add('freeze', 'opened');
								val.classList.remove('open');
							}
						});
						const windowWin = document.getElementById('windowWinWrap');
						clearInterval(interval);
						windowWin.style.display = 'block';
						break;
				}
			}
		}

	});

}