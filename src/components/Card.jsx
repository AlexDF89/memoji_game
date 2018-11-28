import React from 'react';

function Card(props) {

  const createMarkup = () => { return {__html: props.img ? props.img : ''}; };

  const clickOnLi = event => {
    const li = event.target.parentNode;
    if (li.classList.contains('opened') || li.classList.contains('freeze') || li.classList.contains('freezeErr')) return;
    props.clickPass(event.target);
  }

  return (
    <li 
      onClick={clickOnLi} 
      data-position={props.position} 
      className={`
        ${props.opened ? 'opened' : ''} 
        ${props.freeze ? 'freeze' : ''} 
        ${props.freezeErr ? 'freezeErr' : ''} 
      `}>
      <div className="shirt"></div>
      <div dangerouslySetInnerHTML={createMarkup()} className="emotion" />
    </li>
  );
}

export default Card;