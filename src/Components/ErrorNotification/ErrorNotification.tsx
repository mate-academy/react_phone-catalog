import React from 'react';

export const ErrorNotification = () => {
  return (
    <div className="error-notification">
      <h1 className="error-notification__title">Page Not Found</h1>
      <img src={'img/page-not-found.png'} alt="" />
    </div>
  );
};
