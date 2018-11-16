import React from 'react';
import Input from './Input';
import Button from './Button';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

    event.preventDefault();

    const numCards = document.getElementById('numCards');
    const numSec = document.getElementById('numSec');

    this.props.passParam(numCards.value, numSec.value);

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <Input idElem='numCards' text='Введите количество карт:' inputType='text'  inputValue='12' />
          <Input idElem='numSec' text='Введите время на игру в секундах:' inputType='text' inputValue='60' />
          <Button type='submit'>Играть</Button>
      </form>
    );
  }
}

export default Form;