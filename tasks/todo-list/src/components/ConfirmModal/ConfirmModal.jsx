import React, { useEffect, useState } from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ show, onConfirm, onCancel, label }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible && !show) {
    return null;
  }

  return (
    <div className={`confirm-modal ${show ? 'show' : ''}`}>
      <div className="confirm-modal__content">
        <p>{label}</p>
        <div className="confirm-modal__buttons">
          <button onClick={onCancel}>Нет</button>
          <button onClick={onConfirm}>Да</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
