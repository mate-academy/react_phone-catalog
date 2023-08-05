/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import {
  Link,
} from 'react-router-dom';
import '../../styles/styles.scss';

export const Footer: FC = () => {
  // Function to scroll back to top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <Link to="/" className="footer__link">
          <img src="images/logo.jpg" alt="Logo" />
        </Link>
        <div className="footer__container">
          <Link to="/" className="footer__link">Github</Link>
          <Link to="/" className="footer__link">Contacts</Link>
          <Link to="/" className="footer__link">rights</Link>
        </div>
        <button
          className="footer__backtotop-button"
          type="button"
          onClick={scrollToTop}
        >
          <img src="images/icons/ArrowUpDark.svg" alt="Back to top" />
        </button>
      </div>
    </footer>
  );
};
