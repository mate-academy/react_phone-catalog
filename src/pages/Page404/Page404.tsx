import React from 'react';
import { Link } from 'react-router-dom';

import { MainButton } from '../../components/Buttons/MainButton/MainButton';

import { NavLinks } from '../../types/NavLinks';
import { ButtonText } from '../../types/ButtonText';

import './Page404.scss';

export const Page404: React.FC = React.memo(() => (
  <section className="page404 page__section">
    <div className="container">
      <div className="page404__content">
        <div className="grid page404__inner-content">
          <Link
            to="/"
            className="icon page404__icon"
          >
            <div className={`icon__image ${NavLinks.NotFound}`} />
          </Link>

          <p className="page404__text">
            Sorry, we couldn`t find this page
          </p>

          <MainButton
            text={ButtonText.GoHome}
            where="/"
            className="page404__button"
          />
        </div>
      </div>
    </div>
  </section>
));
