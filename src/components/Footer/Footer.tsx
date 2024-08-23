import { Btn } from '../Btn';
import { Logo } from '../Logo';

export const Footer = () => (
  <footer className="footer">
    <div className="footer__container container">
      <Logo className="footer__logo" href="/" />

      <ul className="footer__list">
        <li className="footer__item">
          <a
            className="footer__link"
            href="https://github.com/ivankovbohdan/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </li>
        <li className="footer__item">
          <a
            className="footer__link"
            href="https://github.com/ivankovbohdan"
            target="_blank"
            rel="noreferrer"
          >
            Contacts
          </a>
        </li>
        <li className="footer__item">
          <a
            className="footer__link"
            href="https://github.com/ivankovbohdan"
            target="_blank"
            rel="noreferrer"
          >
            Rights
          </a>
        </li>
      </ul>

      <Btn
        className="footer__top-btn"
        iconName="icon-arrow-up"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      />
    </div>
  </footer>
);
