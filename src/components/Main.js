import React from 'react';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import {api} from '../utils/api.js';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

function Main(props) {
  const [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    api.getInitialCards().
    then(res => { setCards(res)})
    .catch((err) => console.log(err));
  });

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Send a request to the API and getting the updated card data
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Create a new array based on the existing one and putting a new card into it
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Update the state
      setCards(newCards);
    });
}

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      // Create a new array based on the existing one and putting a new card into it
        const newCards = cards.filter((c) => c._id === card._id);
      // Update the state
        setCards(newCards);
    });
  }

  function handleUpdateUser(user) {
    api.updateUserInfo(user).then((res) => {
      currentUser.name = res.name;
      currentUser.about = res.about;
    }).catch((err) => console.log(err)).
    finally(() => {
      props.onCloseAllPopups();
    });
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar).then((res) => {
      console.log(res);
      currentUser.avatar = res.avatar;
    }).catch((err) => console.log(err)).
    finally(() => {
      props.onCloseAllPopups();
    });
  }

  return (
    <>
    <main className="main">
      <section className="profile">
        <div className="profile__person">
          <div className="profile__avatar-wrapper">
            <img src={currentUser.avatar} alt="User ptofile avatar" className="profile__avatar" />
            <div className="profile__avatar-hover" onClick={props.onEditAvatar} ></div>
          </div>
          <div className="profile__info">
            <div className="profile__info-wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="btn profile__edit-btn" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="btn profile__add-btn" onClick={props.onAddPlace}></button>
      </section>
      <ul className="gallery">
      { cards.map(item => {
        return <Card card={item} key={item._id} onCardClick={props.onSelectedCard} onCardLike={handleCardLike} onCardDelete={handleCardDelete} /> }
      )
    }
      </ul>
    </main>

    {<EditProfilePopup isOpen={props.isEditProfilePopupOpen} onClose={props.onCloseAllPopups} onUpdateUser={handleUpdateUser} />}

   { <PopupWithForm title='New place' name='add-card' isOpen={props.isAddPlacePopupOpen} onClose={props.onCloseAllPopups} >
      <input type="text" name="name" id="title-input" className="form__input add-card__title" placeholder="Title" minLength="2" maxLength="30" required />
      <span id="title-input-error" className="form__input-error"></span>
      <input type="url" name="link" id="link-input" className="form__input add-card__image-link" placeholder="Image URL" required />
      <span id="link-input-error" className="form__input-error"></span>
     </PopupWithForm>
   }

     {<PopupWithImage card={props.selectedCard} onClose={props.onCloseAllPopups} />}

     {<PopupWithForm title='Are you sure?' name='delete-card' />}


    {<EditAvatarPopup isOpen={props.isEditAvatarPopupOpen} onClose={props.onCloseAllPopups} onUpdateAvatar={handleUpdateAvatar} />}
      />
    </>
  );
}
export default Main;
