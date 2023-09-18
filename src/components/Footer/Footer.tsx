import './style.scss';
import { Logo } from '../Logo/Logo';

export const Footer = () => {
  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <Logo parent="footer" />
      <div className="footer__links">
        <a
          href="https://github.com/yura-enttsel"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <a
          href="https://github.com/yura-enttsel"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          Contacts
        </a>
        <a
          href="https://github.com/yura-enttsel"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          Rigths
        </a>
      </div>

      <div className="footer__back">
        <div className="footer__text">
          Back to top
        </div>
        <button
          type="button"
          className="footer__button"
          aria-label="Back to top"
          onClick={() => goToTop()}
        >
          <img src="../icons/chevron.svg" alt="To top" />
        </button>
      </div>
    </footer>
  );
};
