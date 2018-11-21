import React from 'react';

function Card(props) {

  const createMarkup = () => { return {__html: props.img ? props.img : ''}; };

  const clickOnLi = event => {
    props.clickPass(event.target);
  }

  return (
    <li onClick={clickOnLi} data-position={props.position}>
      <div className="shirt"></div>
      <div dangerouslySetInnerHTML={createMarkup()} className="emotion" />
    </li>
  );
}

export default Card;