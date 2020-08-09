import React from 'react';

function PopupWithForm(props) {

  function close () {
    this.reset();
  }

   function handleSubmitHandler (evt) {
    evt.preventDefault();
    alert('hi');
    open();
    // submitSelector.value = loadingText;
  }

  function setEventListeners () {
    // ?????
    // setEventListeners();
    this.addEventListener('submit', handleSubmitHandler);
  }

  function removeEventListeners () {
    removeEventListeners();
    this.removeEventListener('submit', handleSubmitHandler);
  }

  function open () {
    document.querySelector(`'.${props.name}'`).closest('.popup').classList.add('popup_opened');
    setEventListeners();
  }

  function setLoadingText (text) {
    // submitSelector.value = text;
  }

  return (
    <div className="popup">
      <div className="popup__container">
        <span className="popup__close">+</span>
        <form action="#" method="post" className={`form ${props.name}`} name={`${props.name}`} noValidate>
          <h2 className={`${props.name}__heading`}>{props.title}</h2>
          {props.children}
          <input type="submit" name="save" className={`btn form__submit ${props.name}__save`} onSubmit={handleSubmitHandler} value="Save" />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
