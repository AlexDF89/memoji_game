import React from 'react';
import Form from './Form';

function WindowLose(props) {
  
  function onStartGame(numCards, numSec) {
    props.startGame(numCards, numSec);
  }

  return (
    <div className="windowLoseWrap" id="windowLoseWrap">
      <div className="windowLose">
        <h2><span className="lose">L</span><span className="lose">o</span><span className="lose">s</span><span className="lose">e</span></h2>
        <Form passParam={onStartGame} />        
      </div>
    </div>
  );
}

export default WindowLose;