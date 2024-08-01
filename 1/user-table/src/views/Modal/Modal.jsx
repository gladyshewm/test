import React from 'react';
import './Modal.css';
import XmarkIcon from '../../icons/XmarkIcon';

const Modal = ({ user, onClose }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <XmarkIcon />
        </button>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>
          <strong>Возраст:</strong> {user.age}
        </p>
        <p>
          <strong>Адрес:</strong> {user.address.city}, {user.address.address}
        </p>
        <p>
          <strong>Рост:</strong> {user.height} см
        </p>
        <p>
          <strong>Вес:</strong> {user.weight} кг
        </p>
        <p>
          <strong>Телефон:</strong> {user.phone}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
};

export default Modal;
