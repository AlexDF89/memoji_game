import React from 'react';

function GamePage (props) {
  return (
    <section>
      Hello World
      {props.cards}
      {props.sec}
    </section>
  );
}

export default GamePage;