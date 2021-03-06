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
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deleteCard, setDeleteCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getInitialCards().then(res => { setCards(res);  }).catch((err) => console.log(err));
  }, [cards]);

  React.useEffect(() => {
    api.getUserInfo().then(res => {
      setCurrentUser(res);
    })
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
    setDeleteConfirmationPopup(!isDeleteConfirmationPopup);
    setDeleteCard(card);
  }

  function handleConfirmDelete() {
    setIsLoading(true);
    closeAllPopups();
    if (isDeleteConfirmationPopup) {
      api.removeCard(deleteCard._id).then(() => {
      // Create a new array based on the existing one and removing a card from it
        const newCards = cards.filter((c) => c._id !== deleteCard._id);
      // Update the state
        setCards(newCards);}).catch((err) => console.log(err)).finally(() => {
      setDeleteCard(null);
      setIsLoading(false);
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
    setIsLoading(true);
    closeAllPopups();
    api.updateUserInfo(user).then((res) => {
      currentUser.name = res.name;
      currentUser.about = res.about;
    }).catch((err) => console.log(err)).finally(() => {
      setIsLoading(false);
    });
  }

  function handleUpdateAvatar(avatar) {
    closeAllPopups();
    setIsLoading(true);
    api.setUserAvatar(avatar).then((res) => {
      currentUser.avatar = res.avatar;}).catch((err) => console.log(err)).finally(() => {
      setIsLoading(false);
    });
  }

  function handleAddPlace(newCard) {
    closeAllPopups();
    setIsLoading(true);
    api.addCard(newCard).then((res) => {
      setCards([...cards, res]);}).catch((err) => console.log(err)).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <div className={`page ${ isLoading ? 'loader' : '' }`} >
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
        isPopupWithImageOpen={isPopupWithImageOpen}
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
      <PopupWithImage isOpen={isPopupWithImageOpen} card={selectedCard} onClose={closeAllPopups} />

       </CurrentUserContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
