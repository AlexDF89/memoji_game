import React from 'react';
import Input from './Input';
import Button from './Button';

function Form (props) {
  return (
    <form>
        <Input text='Введите количество карт:' inputType='text'  inputValue='12' />
        <Input text='Введите время на игру в секундах:' inputType='text' inputValue='60' />
        <Button text='Играть' />
    </form>
  );
}

export default Form;