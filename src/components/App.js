import React from 'react';
// import logo from './images/logo.png';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

function App() {
  const [isEditProfilePopupOpen, setEditPopup]  = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatar] = React.useState(false);

  // const [isPopupClose, setPopupClose] = React.useState(false);

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
      onCloseAllPopups={closeAllPopups} />
      <Footer />
    </div>
  );
}

export default App;
