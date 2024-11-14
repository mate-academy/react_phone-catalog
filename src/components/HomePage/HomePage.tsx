import React from 'react';
import './HomePage.scss';
import { Banner } from '../Banner/Banner';

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="container">
        <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>
        <Banner />
      </div>
    </div>
  );
};
