import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import {api} from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import PopupWithImage from './PopupWithImage';

function App() {
  const [isEditProfilePopupOpen, setEditPopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatar] = React.useState(false);
  const [isDeleteConfirmationPopup, setDeleteConfirmationPopup] = React.useState(false);
  const [isPopupWithImageOpen, setPopupWithImage] = React.useState(false);



  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deleteCard, setDeleteCard] = React.useState(null);

  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getInitialCards().then(res => { setCards(res)}).catch((err) => console.log(err));
  }, [cards]);

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
    setDeleteConfirmationPopup(!isDeleteConfirmationPopup);
    setDeleteCard(card);
  }

  function handleConfirmDelete() {
    if (isDeleteConfirmationPopup) {
      api.removeCard(deleteCard._id).then(() => {
      // Create a new array based on the existing one and putting a new card into it
        const newCards = cards.filter((c) => c._id === deleteCard._id);
      // Update the state
        setCards(newCards);}).catch((err) => console.log(err)).finally(() => {
      setDeleteCard(null);
      closeAllPopups();
    });
  }
}

  function handleEditAvatarClick () {
    setEditAvatar(true);
  }

  function handleEditProfileClick () {
    setEditPopup(true);
  }

  function handleAddPlaceClick () {
    setAddPlace(true);
  }

  React.useEffect(() => {
    api.getUserInfo().then(res => {
      setCurrentUser(res);
    })
    .catch((err) => console.log(err));
  });

  function closeAllPopups () {
    setEditAvatar(false);
    setEditPopup(false);
    setAddPlace(false);
    setSelectedCard(null);
    setDeleteConfirmationPopup(false);
  }

  function handleCardClick(card) {
    setPopupWithImage(true);
    setSelectedCard(card);
  }

  function handleUpdateUser(user) {
    api.updateUserInfo(user).then((res) => {
      currentUser.name = res.name;
      currentUser.about = res.about;}).catch((err) => console.log(err)).finally(() => {
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar).then((res) => {
      currentUser.avatar = res.avatar;}).catch((err) => console.log(err)).finally(() => {
      closeAllPopups();
    });
  }

  function handleAddPlace(newCard) {
    api.addCard(newCard).then((res) => {
      setCards([...cards, res]);}).catch((err) => console.log(err)).finally(() => {
      closeAllPopups();
    });
  }

  return (
    <div className="page" >
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
      <Main
      onEditProfile={handleEditProfileClick}
      onEditAvatar={handleEditAvatarClick}
      onAddPlace={handleAddPlaceClick}
      isEditProfilePopupOpen={isEditProfilePopupOpen}
      isAddPlacePopupOpen={isAddPlacePopupOpen}
      isEditAvatarPopupOpen={isEditAvatarPopupOpen}
      isDeleteConfirmationPopup={isDeleteConfirmationPopup}
      selectedCard={selectedCard}
      onSelectedCard={handleCardClick}
      cards={cards}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
       />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
      <DeleteConfirmationPopup isOpen={isDeleteConfirmationPopup} onClose={closeAllPopups} onConfirmDelete={handleConfirmDelete} />
      <PopupWithImage card={selectedCard} onClose={closeAllPopups} />


       </CurrentUserContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
