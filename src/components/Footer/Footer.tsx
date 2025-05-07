import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Service from '../../utils/service';
import './Footer.scss';

export const Footer = () => (
  <footer className="footer">
    <div className="container footer__container">
      <div className="footer__leftBlock">
        <NavLink to="/" onClick={Service.scrollWindowTop}>
          <div className="icon icon__logo icon__logo--footer" />
        </NavLink>
      </div>

      <div className="footer__centerBlock">
        <a
          href="https://github.com/yepolotn1ak"
          className="link link__footer"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <p className="link link__footer">Contacts</p>
        <p className="link link__footer">Rights</p>
      </div>

      <div className="footer__rightBlock" onClick={Service.scrollWindowTop}>
        <p className="small-text link link__footer--back">Back to top</p>

        <div className="button">
          <div className="footer__rightBlock--arrow-img" />
        </div>
      </div>
    </div>
  </footer>
);
