import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="header__logo" />
      <div className="footer__link">
        <Link className="footer__text" to="https://github.com/Tetiana-Hishchak">
          <p className="footer__text">Github</p>
        </Link>
        <Link className="footer__text" to="https://github.com/Tetiana-Hishchak">
          <p className="footer__text">Contacts</p>
        </Link>
        <Link
          to="https://github.com/Tetiana-Hishchak"
          className="footer__text"
        >
          <p className="footer__text">rights</p>
        </Link>
      </div>
      <div className="footer__top">
        <p className="footer__back">
          Back to top
        </p>
        <button
          type="button"
          aria-label="Mute volume"
          className="footer__button--top"
        />
      </div>
    </footer>
  );
};
