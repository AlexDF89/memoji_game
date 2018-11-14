import React from 'react';
import Title from './components/title';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <Title title="Memoji" />
        <p>В игре Memoji есть колода карточек с парными изображениями. Колода раскладывается в случайном порядке рубашкой вверх. Игрок может открывать 2 карточки за один ход. Если при открытии карт образовалась «парочка», она остаётся открытой. Игра продолжается, пока не будет открыто всё поле.</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));