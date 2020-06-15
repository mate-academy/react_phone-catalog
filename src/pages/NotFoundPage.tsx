import React from 'react';
import './NotFoundPage.scss';
import { GoBackButton } from '../components/Buttons/GoBack';

export const NotFoundPage = () => (
  <>
    <section className="section">
      <div className="container">
        <div className="face">
          <div className="band">
            <div className="red" />
            <div className="white" />
            <div className="blue" />
          </div>
          <div className="eyes" />
          <div className="dimples" />
          <div className="mouth" />
        </div>
        <div className="back_toHome">
          <h1 className="error__message">Oops! Something went wrong!</h1>
          <GoBackButton />
        </div>
      </div>
    </section>
  </>
);
