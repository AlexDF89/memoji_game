import React from 'react';
import Card from './Card';

function GamePage (props) {
  return (
    <section>
      <ul id="field" data-game-id="gameID">
        {props.cards.map(card => {
          return <Card img={card.image} />
        })}
      </ul>
      <div className="timer" id="timer">{props.sec}</div>
    </section>
  );
}

export default GamePage;