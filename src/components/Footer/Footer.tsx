import './Footer.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/" className="footer__logo" />

        <div className="footer__links">
          <a
            href="https://github.com/VKdrvtsv"
            target="_blanc"
            className="footer__link"
          >
            Github
          </a>
          <Link
            to="/"
            className="footer__link"
          >
            Contacts
          </Link>
          <Link
            to="/"
            className="footer__link"
          >
            Rights
          </Link>
        </div>

        <div className="footer__up-button">
          <p>Back to top</p>
          <button
            aria-label="scroll-to-top"
            type="button"
            onClick={handleScrollToTop}
            className="footer__button"
          />
        </div>
      </div>
    </footer>
  );
};
