import { handleScrollToTop } from '../../services/helpers';
import { Logo } from '../Logo';
import './Footer.scss';

export const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <Logo logoClass="footer" />
      <nav className="footer__nav">
        <ul className="footer__list">
          <li className="footer__item">
            <a
              href="https://github.com/IrynaZahorodnia"
              target="_blank"
              className="footer__link"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer__item">
            <a
              href="https://github.com/IrynaZahorodnia"
              target="_blank"
              className="footer__link"
              rel="noreferrer"
            >
              Contacts
            </a>
          </li>
          <li className="footer__item">
            <a
              href="https://github.com/IrynaZahorodnia"
              target="_blank"
              className="footer__link"
              rel="noreferrer"
            >
              Rights
            </a>
          </li>
        </ul>
      </nav>
      <div className="footer__bottom" onClick={handleScrollToTop}>
        <div className="footer__text">Back to top</div>
        <div className="footer__button"></div>
      </div>
    </div>
  </footer>
);
