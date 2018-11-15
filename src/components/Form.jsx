import React from 'react';
import Input from './Input';
import Button from './Button';

function Form (props) {
  return (
    <form>
        <Input text='Введите количество карт:' inputType='text' />
        <Input text='Введите время на игру в секундах:' inputType='text' />
        <Button text='Играть' />
    </form>
  );
}

export default Form;