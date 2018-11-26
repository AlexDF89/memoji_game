import React from 'react';
import Card from './Card';
import Timer from './Timer';

function GamePage (props) {

  const clickCard = (event) => {
    props.handleClick(event);
  };

  return (
    <section>
      <ul id="field" data-game-id={props.gameID}>
        {props.cards.map(card => {
          return <Card
                    clickPass={clickCard}
                    key={card.position}
                    position={card.position}
                    img={card.image ? card.image : ''} 
                    opened={card.opened} 
                    freeze={card.freeze} 
                    freezeErr={card.freezeErr} />
        })}
      </ul>
      <Timer time={props.time} />
    </section>
  );
}

export default GamePage;