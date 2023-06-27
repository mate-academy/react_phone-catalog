import { scrollToTop } from '../../helpers/dom';
import arrowUp from '../../assets/svg/arrow_up.svg';
import './Footer.scss';
import { Logo } from '../UI/Logo';

export const Footer = () => (
  <footer className="footer">
    <Logo />

    <ul className="footer__list">
      <li className="footer__item">
        <a
          title="Github"
          target="_blank"
          href="https://github.com/Zibi95/react_phone-catalog"
          className="footer__link"
          rel="noreferrer"
        >
          Github
        </a>
      </li>

      <li className="footer__item">
        <a href="#/" className="footer__link">
          Contacts
        </a>
      </li>

      <li className="footer__item">
        <a href="#/" className="footer__link">
          Rights
        </a>
      </li>
    </ul>

    <button className="footer__button" type="button" onClick={scrollToTop}>
      Back to top
      <img className="footer__icon" src={arrowUp} alt="" />
    </button>
  </footer>
);
