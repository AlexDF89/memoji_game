import React from 'react';

function Input (props) {
  return (
    <label>
      <p>
        {props.text ? props.text : ''}
      </p>
      <input 
        type={props.inputType}
        placeholder={props.text ? props.text : ''}
        defaultValue={props.inputValue ? props.inputValue : ''} />
    </label>
  );
}

export default Input;