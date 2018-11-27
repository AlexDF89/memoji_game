import React from 'react';
import Input from './Input';
import Button from './Button';

function WindowWin(props) {
  
  function onStartGame(event) {
    event.preventDefault();
    const numCards = document.getElementById('numCards');
    const numSec = document.getElementById('numSec');
    
    props.startGame(numCards.value, numSec.value,);
  }
  
  return (
    <div className="windowWinWrap" id="windowWinWrap">
      <div id="windowWin" className="windowWin">
        <h2><span className="win">W</span><span className="win">i</span><span className="win">n</span></h2>
        <form onSubmit={onStartGame}>
            <Input idElem='numCards' text='Введите количество карт:' inputType='text'  inputValue='12' />
            <Input idElem='numSec' text='Введите время на игру в секундах:' inputType='text' inputValue='60' />
            <Button type='submit'>Играть ещё раз</Button>
        </form>
      </div>
    </div>
  );
}

export default WindowWin;