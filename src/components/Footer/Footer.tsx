import { LogoLink } from '../LogoLink';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <LogoLink />
        <div className="footer__links">
          <a
            href="https://github.com/Daniilart01"
            target="_blank"
            rel="noreferrer"
            className="footer__links-item"
          >
            Github
          </a>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noreferrer"
            className="footer__links-item"
          >
            Contacts
          </a>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noreferrer"
            className="footer__links-item"
          >
            Rights
          </a>
        </div>
        <div className="footer__backToTop">
          <button
            type="button"
            className="footer__backToTop-button"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <p className="footer__backToTop-button-title">
              Back to top
            </p>
            <div
              className="footer__backToTop-button-arrow simple-button arrow-up
                with-background"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
