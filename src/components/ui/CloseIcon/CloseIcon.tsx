import React from 'react';
import closeIcon from '../../../assets/icons/close.svg';

export const CloseIcon: React.FC = () => {
  return (
    <img src={closeIcon} alt="close" className="header__menu-close-icon" />
  );
};
