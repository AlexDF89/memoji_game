import React from 'react';
import Input from './Input';
import Button from './Button';

function Form(props) {

	const handleSubmit = (event) => {
		event.preventDefault();
    	const numCards = document.getElementById('numCards');
    	const numSec = document.getElementById('numSec');
		props.passParam(numCards.value, numSec.value);
	}

	return (
		<form onSubmit={handleSubmit}>
				<Input idElem='numCards' text='Введите количество карт:' inputType='text'  inputValue='12' />
				<Input idElem='numSec' text='Введите время на игру в секундах:' inputType='text' inputValue='60' />
				<Button type='submit'>Играть</Button>
		</form>
	);
}

export default Form;