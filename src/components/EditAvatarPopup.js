import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
  e.preventDefault();

  props.onUpdateAvatar({
    avatar: avatarRef.current.value,
  });
  avatarRef.current.value = '';
  
}

  return (<PopupWithForm title='Change profile picture' name='change-avatar' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
        <input type="url" name="avatar-link" id="avatar-input" ref={avatarRef} className="form__input change-avatar__link" placeholder="Image URL" required />
        <span id="avatar-input-error" className="form__input-error"></span>
      </PopupWithForm>
    );

}

export default EditAvatarPopup;
