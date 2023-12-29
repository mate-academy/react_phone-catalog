import { Logo } from '../Logo/Logo';
import './Footer.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <Logo />
        <ul className="footer__list">
          <li className="footer__item">
            <h1 className="footer__title">
              <a
                href="https://github.com/RodionSav"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </h1>
          </li>
          <li className="footer__item">
            <h1 className="footer__title">
              <a
                href="https://github.com/RodionSav"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Contacts
              </a>
            </h1>
          </li>
          <li className="footer__item">
            <h1 className="footer__title">
              <a
                href="https://github.com/RodionSav"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Rights
              </a>
            </h1>
          </li>
        </ul>
        <div className="footer-container-back">
          <h1 className="footer__title-back">
            Back to top
          </h1>
          <button
            type="button"
            aria-label="back"
            className="footer__link-back"
            onClick={scrollToTop}
          />
        </div>
      </div>
    </footer>
  );
};
