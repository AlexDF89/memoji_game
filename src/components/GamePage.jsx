import React from 'react';
import Card from './Card';

function GamePage (props) {

  const clickCard = (event) => {
    props.handleClick(event);
  };

  return (
    <section>
      <ul id="field" data-game-id="gameID">
        {props.cards.map(card => {
          return <Card
                    clickPass={clickCard}
                    key={card}
                    position={card}
                    img={card.image ? card.image : ''} />
        })}
      </ul>
      <div className="timer" id="timer">{props.sec}</div>
    </section>
  );
}

export default GamePage;