import React from 'react';

function PopupWithImage () {
  return (
    <div className="popup popup_dark">
      <div className="popup__container popup__container_photo">
        <span className="popup__close">+</span>
        <figure className="photo">
          <img className="photo__item" src="#" alt="" />
          <figcaption className="photo__title"></figcaption>
        </figure>
      </div>
    </div>
  );
}

export default PopupWithImage;
