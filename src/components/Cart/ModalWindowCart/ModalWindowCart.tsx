import React from 'react';
import { NavLink } from 'react-router-dom';
import './ModalWindowCart.scss';

const ModalWindowCart = () => {
  return (
    <div className="modal">
      <div className="modal__wrapper">
        <h1 className="modal__header">
          Thank you for your purchase!
        </h1>
        <NavLink
          to="/"
          exact
          className="modal__link"
        >
          Go to Home page
        </NavLink>
      </div>
    </div>
  );
};

export default ModalWindowCart;
