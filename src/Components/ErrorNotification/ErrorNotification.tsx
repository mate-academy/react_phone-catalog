import React from 'react';
import { Header } from '../Header/header';
import { Footer } from '../Footer/Footer';

export const ErrorNotification = () => {
  return (
    <>
      <Header cartItemsCount={0} favouritesCount={0} setMenuOpen={() => {}} />
      <div className="error-notification">
        <h1 className="error-notification__title">Page Not Found</h1>
        <img src={'img/page-not-found.png'} alt="" />
      </div>
      <Footer />
    </>
  );
};
