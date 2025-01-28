import { scrollToTop } from '../../utils/scrollToTop';
import './Footer.scss';

const LINKS = [
  {
    title: 'Github',
    url: 'https://github.com/deezhizyu/react_phone-catalog/',
  },
  {
    title: 'Contacts',
    url: 'https://github.com/deezhizyu',
  },
  {
    title: 'Rights',
    url: 'https://github.com/deezhizyu',
  },
];

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <img src="logo.svg" alt="Logo" className="footer__logo" />

        <div className="footer__links">
          {LINKS.map(link => (
            <a
              href={link.url}
              target="_"
              className="footer__links-link text-button"
            >
              {link.title}
            </a>
          ))}
        </div>

        <button
          className="footer__back-to-top button--text"
          onClick={scrollToTop}
        >
          <p className="small-text footer__back-to-top-text">Back to top</p>
          <img
            className="button--arrow"
            src="icons/arrow_up.svg"
            alt="Arrow up"
          />
        </button>
      </div>
    </footer>
  );
};
