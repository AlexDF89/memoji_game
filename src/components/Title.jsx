import React from 'react';

function Title (props) {
  return (
    <div className="title-game">
      <h1>{props.title}</h1>
      <a href="http://webdev-master.ru">Вернуться на главную</a>
    </div>
  );
}

export default Title;