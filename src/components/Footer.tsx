import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <Logo />

      <div className="footer__nav">
        <Link
          to="https://github.com/vlkzmn"
          className="footer__link"
          target="_blanc"
        >
          Github
        </Link>

        <Link to="contacts" className="footer__link">
          Contacts
        </Link>
      </div>

      <button
        type="button"
        className="footer__up-arrow"
        onClick={() => window.scrollTo(0, 0)}
      >
        Back to top
      </button>
    </footer>
  );
};
