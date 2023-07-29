/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import {
  Link,
} from 'react-router-dom';
import '../../styles/styles.scss';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <Link to="/" className="footer__link">
        <img src="images/logo.jpg" alt="Logo" />
      </Link>
      <div className="footer__container">
        <Link to="/" className="footer__link">Github</Link>
        <Link to="/" className="footer__link">Contacts</Link>
        <Link to="/" className="footer__link">rights</Link>
      </div>
      <a href="#" className="footer__backtotop-button" type="button">
        <img src="images/icons/ArrowUp.svg" alt="Back to top" />
      </a>
    </footer>
  );
};
