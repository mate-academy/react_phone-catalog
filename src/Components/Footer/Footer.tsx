import { scrollToTop } from '../../helpers/scrollToTop';
import { Logo } from '../Logo';
import './Footer.scss';

enum Links {
  GitHub = 'https://github.com/Sireus',
  Contacts = './',
  Rights = './',
}

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__content">
        <Logo className="footer__logo" />

        <ul className="footer__links">
          {Object.entries(Links).map(([key, value]) => (
            <li className="footer__item" key={key}>
              <a href={value} className="footer__link">
                {key}
              </a>
            </li>
          ))}
        </ul>

        <button className="footer__action" onClick={scrollToTop}>
          Back to top
          <span className="footer__icon-button">
            <i className="icon icon--arrow-up"></i>
          </span>
        </button>
      </div>
    </footer>
  );
};
