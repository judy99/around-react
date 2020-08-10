import React from 'react';
import ReactDOM from 'react-dom';

import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';


function Main() {

  function handleEditAvatarClick () {
    document.querySelector('.change-avatar').closest('.popup').classList.add('popup_opened');
  }

  function handleEditProfileClick () {
    // alert("handleEditProfileClick");
    document.querySelector('.edit-profile').closest('.popup').classList.add('popup_opened');
  }

  function handleAddPlaceClick () {
    document.querySelector('.add-card').closest('.popup').classList.add('popup_opened');
  }

  return (
    <>
    <main className="main">
      <section className="profile">
        <div className="profile__person">
          <div className="profile__avatar-wrapper">
            <img src="images/avatar.jpg" alt="User ptofile avatar" className="profile__avatar" />
            <div className="profile__avatar-hover" onClick={handleEditAvatarClick}></div>
          </div>
          <div className="profile__info">
            <div className="profile__info-wrapper">
              <h1 className="profile__name">Jacques Cousteau</h1>
              <button type="button" className="btn profile__edit-btn" onClick={handleEditProfileClick}></button>
            </div>
            <p className="profile__occupation">Explorer</p>
          </div>
        </div>
        <button type="button" className="btn profile__add-btn" onClick={handleAddPlaceClick}></button>
      </section>
      <ul className="gallery">
      </ul>
    </main>
    // invisible blocks
    // change profile information
    { <PopupWithForm title='Edit profile' name='edit-profile'
    children={
      [
        <div key="1">
        <input type="text" name="name" id="name-input" className="form__input edit-profile__name" placeholder="Name" minLength="2" maxLength="40" required />
        </div>,
        <div key="2">
        <span id="name-input-error" className="form__input-error"></span>
        </div>,
        <div key="3">
        <input type="text" name="job" id="job-input" className="form__input edit-profile__job" placeholder="About me" minLength="2" maxLength="200" required />
        </div>,
        <div key="4">
        <span id="job-input-error" className="form__input-error"></span>
        </div>
      ]
    } /> }

    // add a new card
    { <PopupWithForm title='New place' name='add-card'
    children={
      [
        <div key="1">
        <input type="text" name="name" id="title-input" className="form__input add-card__title" placeholder="Title" minLength="2" maxLength="30" required /></div>,
        <div key="2">
        <span id="title-input-error" className="form__input-error"></span></div>,
        <div key="3">
        <input type="url" name="link" id="link-input" className="form__input add-card__image-link" placeholder="Image URL" required /></div>,
        <div key="4">
        <span id="link-input-error" className="form__input-error"></span></div>
      ]
    } /> }
    // show a card
    { <PopupWithImage /> }
    // delete confirmation
    { <PopupWithForm title='Are you sure?' name='delete-card' /> }

    // change profile picture

    { <PopupWithForm title='Change profile picture' name='change-avatar'
    children={
      [
        <div key='1'>
        <input type="url" name="avatar-link" id="avatar-input" className="form__input change-avatar__link" placeholder="Image URL" required /></div>,
        <div key='2'>
        <span id="avatar-input-error" className="form__input-error"></span></div>
      ]
    } /> }

    <template id="card">
      <li className="gallery__item">
        <button className="btn gallery__icon-trash"></button>
        <div className="gallery__bottom">
          <h2 className="gallery__title"></h2>
          <div className="gallery__like-wrapper">
            <button className="btn gallery__like"></button>
            <div className="gallery__score"></div>
          </div>
        </div>
      </li>
    </template>
    </>
  );

}
export default Main;
