import React from 'react';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import {api} from '../utils/api.js';
import Card from './Card';

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
    })
    .catch((err) => console.log(err));

    api.getInitialCards().
    then(res => { setCards(res)})
    .catch((err) => console.log(err));
  });

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
      { cards.map(item => {
        return <Card card={item} key={item._id} onCardClick={props.onSelectedCard} /> }
      )
    }
      </ul>
    </main>

     <PopupWithForm title='Edit profile' name='edit-profile' isOpen={props.isEditProfilePopupOpen} onClose={props.onCloseAllPopups}
       htmlText = '<input type="text" name="name" id="name-input" class="form__input edit-profile__name" placeholder="Name" minLength="2" maxLength="40" required /><span id="name-input-error" class="form__input-error"></span><input type="text" name="job" id="job-input" class="form__input edit-profile__job" placeholder="About me" minLength="2" maxLength="200" required /><span id="job-input-error" class="form__input-error"></span>'
     />

    { <PopupWithForm title='New place' name='add-card' isOpen={props.isAddPlacePopupOpen} onClose={props.onCloseAllPopups}
      htmlText = '<input type="text" name="name" id="title-input" class="form__input add-card__title" placeholder="Title" minLength="2" maxLength="30" required /><span id="title-input-error" class="form__input-error"></span><input type="url" name="link" id="link-input" class="form__input add-card__image-link" placeholder="Image URL" required /><span id="link-input-error" class="form__input-error"></span>'
     /> }

    { <PopupWithImage card={props.selectedCard} onClose={props.onCloseAllPopups} /> }

    { <PopupWithForm title='Are you sure?' name='delete-card' /> }

    { <PopupWithForm title='Change profile picture' name='change-avatar' isOpen={props.isEditAvatarPopupOpen} onClose={props.onCloseAllPopups}
      htmlText = '<input key="1" type="url" name="avatar-link" id="avatar-input" class="form__input change-avatar__link" placeholder="Image URL" required /><span key="2" id="avatar-input-error" class="form__input-error"></span>'

      /> }
    </>
  );
}
export default Main;
