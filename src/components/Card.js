import React from 'react';

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <li className="gallery__item" onClick={handleClick} style={{ backgroundImage: `url(${props.card.link})` }}  >
      <button className="btn gallery__icon-trash"></button>
      <div className="gallery__bottom" >
        <h2 className="gallery__title">{props.card.name}</h2>
        <div className="gallery__like-wrapper">
          <button className="btn gallery__like"></button>
          <div className="gallery__score">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}
export default Card;
