import React from 'react';

function Input (props) {
  return (
    <div>
      <div>
        {props.text ? props.text : ''}
      </div>
      <input 
        type={props.inputType}
        placeholder={props.text ? props.text : ''} />
    </div>
  );
}

export default Input;