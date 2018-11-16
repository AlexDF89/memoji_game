import React from 'react';
import Form from './Form';

function StartPage (props) {
    function onStartGame(numCards, numSec) {
      props.startGame(numCards, numSec);
    }
  return (
    <section>
      <div className="memoji-desc">
        В игре Memoji есть колода карточек с парными изображениями. Колода раскладывается в случайном порядке рубашкой вверх. Игрок может открывать 2 карточки за один ход. Если при открытии карт образовалась «парочка», она остаётся открытой. Игра продолжается, пока не будет открыто всё поле.
      </div>
      <Form passParam={onStartGame} />
    </section>
  );
}


export default StartPage;