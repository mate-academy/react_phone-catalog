import { scrollToTop } from '../../utils/utils';
import { Logo } from '../Logo/Logo';
import './Footer.scss';

enum Links {
  GitHub = 'https://github.com/vbuldenko',
  Contacts = './',
  Rights = './',
}

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__content">
        <Logo className="footer__logo" />

        <ul className="nav__list footer__list">
          {Object.entries(Links).map(([key, value]) => (
            <li className="nav__item" key={key}>
              <a href={value} className="nav__link">
                {key}
              </a>
            </li>
          ))}
        </ul>

        <button className="footer__button" onClick={scrollToTop}>
          Back to top
          <span className="footer__button-icon icon icon--arrow-up"></span>
        </button>
      </div>
    </footer>
  );
};
