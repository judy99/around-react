import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import {api} from '../utils/api.js';

function App() {
  const [isEditProfilePopupOpen, setEditPopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatar] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});

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
      // console.log(res);
      setCurrentUser(res);
    })
    .catch((err) => console.log(err));
  });

  function closeAllPopups () {
    setEditAvatar(false);
    setEditPopup(false);
    setAddPlace(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page" >
      <Header />
      <Main
      onEditProfile={handleEditProfileClick}
      onEditAvatar={handleEditAvatarClick}
      onAddPlace={handleAddPlaceClick}
      isEditProfilePopupOpen={isEditProfilePopupOpen}
      isAddPlacePopupOpen={isAddPlacePopupOpen}
      isEditAvatarPopupOpen={isEditAvatarPopupOpen}
      onCloseAllPopups={closeAllPopups}
      selectedCard={selectedCard}
      onSelectedCard={handleCardClick}
      currentUser={currentUser}
       />
      <Footer />
    </div>
  );
}

export default App;
