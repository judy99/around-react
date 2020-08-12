import React from 'react';
import ReactDOM from 'react-dom';

import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import {api} from '../utils/Api.js';

function Main(props) {
  const [userName, setUserName] = React.useState('test');
  const [userDescription, setDescription] = React.useState('test job');
  const [userAvatar, setUserAvatar] = React.useState('#');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo().then(res => {
      setUserName(res.name);
      setDescription(res.description);
      setUserAvatar(res.avatar);
    });
    api.getInitialCards().then(res => {
      console.log(`length = ${res.length}`);
      setCards(res);
    });
  });

  // React.useEffect(() => {
  //   api.getInitialCards().then(res => {
  //     console.log(res);
  //     console.log(`length = ${res.length}`);
  //     // setCards(res);
  //   });
  // });


  return (
    <>
    <main className="main">
      <section className="profile">
        <div className="profile__person">
          <div className="profile__avatar-wrapper">
            <img src={userAvatar} alt="User ptofile avatar" className="profile__avatar" />
            <div className="profile__avatar-hover" onClick={props.onEditAvatar} ></div>
          </div>
          <div className="profile__info">
            <div className="profile__info-wrapper">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="btn profile__edit-btn" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__occupation">{userDescription}</p>
          </div>
        </div>
        <button type="button" className="btn profile__add-btn" onClick={props.onAddPlace}></button>
      </section>
      <ul className="gallery">
      { cards.map(item =>
        (
          <li className="gallery__item" style={{ backgroundImage: `url(${item.link})` }} key={`"${item._id}"`}>
            <button className="btn gallery__icon-trash"></button>
            <div className="gallery__bottom">
              <h2 className="gallery__title">{item.name}</h2>
              <div className="gallery__like-wrapper">
                <button className="btn gallery__like"></button>
                <div className="gallery__score">{item.likes.length}</div>
              </div>
            </div>
          </li>
      )
      )
    }
      </ul>
    </main>

    // invisible blocks
    // edit profile
     <PopupWithForm title='Edit profile' name='edit-profile' isOpen={props.isEditProfilePopupOpen} onClose={props.onCloseAllPopups}
    children={
      [
        <input key="1" type="text" name="name" id="name-input" className="form__input edit-profile__name" placeholder="Name" minLength="2" maxLength="40" required />,
        <span key="2" id="name-input-error" className="form__input-error"></span>,
        <input key="3" type="text" name="job" id="job-input" className="form__input edit-profile__job" placeholder="About me" minLength="2" maxLength="200" required />,
        <span key="4" id="job-input-error" className="form__input-error"></span>
      ]
    } />

    // add a new card
    { <PopupWithForm title='New place' name='add-card' isOpen={props.isAddPlacePopupOpen} onClose={props.onCloseAllPopups}
    children={
      [
        <input key="1" type="text" name="name" id="title-input" className="form__input add-card__title" placeholder="Title" minLength="2" maxLength="30" required />,
        <span key="2" id="title-input-error" className="form__input-error"></span>,
        <input key="3" type="url" name="link" id="link-input" className="form__input add-card__image-link" placeholder="Image URL" required />,
        <span key="4" id="link-input-error" className="form__input-error"></span>
      ]
    } /> }
    // show a card
    { <PopupWithImage /> }

    // delete confirmation
    { <PopupWithForm title='Are you sure?' name='delete-card' /> }


    // change avatar
    { <PopupWithForm title='Change profile picture' name='change-avatar' isOpen={props.isEditAvatarPopupOpen} onClose={props.onCloseAllPopups}
    children={
      [
        <input key="1" type="url" name="avatar-link" id="avatar-input" className="form__input change-avatar__link" placeholder="Image URL" required />,
        <span key="2" id="avatar-input-error" className="form__input-error"></span>
      ]
    } /> }

    </>
  );
}
export default Main;
