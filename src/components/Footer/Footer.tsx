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
          <Link
            to="https://github.com/VazilX/react_phone-catalog"
            className="footer__git-hab-link"
          >
            Github repo
          </Link>
        </div>
      </div>
    </div>
  );
};
