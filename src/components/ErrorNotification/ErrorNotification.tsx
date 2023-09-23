import React from 'react';
import './ErrorNotification.scss';

export const ErrorNotification: React.FC = () => {
  return (
    <div className="notification__error">
      Oops!
      Our servers playing hide and seek with the products,
      but our tech wizards are on it. Stay tuned for the virtual
      treasures coming your way!
      Check your internet connection and try again...
    </div>
  );
};
