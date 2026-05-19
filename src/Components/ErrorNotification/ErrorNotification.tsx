import React from 'react';

export const ErrorNotification = () => {
  return (
    <div className="error-notification">
      <p className="error-notification__title">Page Not Found</p>
      <img src={'img/page-not-found.png'} alt="" />
    </div>
  );
};
