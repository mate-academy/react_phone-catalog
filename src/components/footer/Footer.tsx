import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss';
import { ScrollBackToTop } from '../../utils/scrollWindowTop';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__leftBlock">
          <NavLink onClick={ScrollBackToTop} to="/home">
            <div className="icon icon__logo footer__logo"></div>
          </NavLink>
        </div>
        <div className="footer__centerBlock">
          <a
            href="https://github.com/mate-academy/react_phone-catalog"
            className="link footer__centerBlock--link"
          >
            Github
          </a>
          <a href="" className="link footer__centerBlock--link">
            Contacts
          </a>
          <a href="" className="link footer__centerBlock--link">
            Rights
          </a>
        </div>
        <div onClick={ScrollBackToTop} className="footer__rightBlock">
          <p className="footer__rightBlock--link">Back to top</p>
          <div className="footer__rightBlock--imgLink">
            <div className="footer__rightBlock--img"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};
