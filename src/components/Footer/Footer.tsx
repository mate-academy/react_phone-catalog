import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { ButtonUp } from '../ButtonUp';
import '../../helpers/style/mixins.scss';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__container">
          <div className="footer__logo">
            <Logo />
          </div>
          <div className="footer__nav">
            <Nav isFooter />
          </div>
          <div className="footer__button">
            <ButtonUp />
          </div>
          <Link to="/" className="footer__git-hab-link">
            ВСТАВИТЬ СЫЛКУ
          </Link>
        </div>
      </div>
    </div>
  );
};
