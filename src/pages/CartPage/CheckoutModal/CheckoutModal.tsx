import React from 'react';
import './CheckoutModal.scss';

type Props = {
  name: string;
  contact: string;
  errors: { name: string; contact: string };
  onNameChange: (value: string) => void;
  onContactChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
};

export const CheckoutModal: React.FC<Props> = ({
  name,
  contact,
  errors,
  onNameChange,
  onContactChange,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="modal__overlay">
      <div className="modal">
        <h2 className="modal__title">Placing an order</h2>
        <label className="modal__label">
          Name:
          <input
            type="text"
            value={name}
            onChange={event => onNameChange(event.target.value)}
            className="modal__input"
            placeholder="Enter full name"
            required
          />
          {errors.name && <small className="modal__error">{errors.name}</small>}
        </label>

        <label className="modal__label">
          Telephone or Email:
          <input
            type="text"
            value={contact}
            onChange={event => onContactChange(event.target.value)}
            className="modal__input"
            placeholder="example@gmail.com"
            required
          />
          {errors.contact && (
            <small className="modal__error">{errors.contact}</small>
          )}
        </label>

        <div className="modal__button">
          <button className="modal__button--confirm" onClick={onConfirm}>
            Confirm order
          </button>
          <button className="modal__button--cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
