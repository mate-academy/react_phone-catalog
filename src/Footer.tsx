import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__image" />
      </div>

      <div className="footer__content">
        <div className="footer__link_container">
          <Link
            to="/"
            className="footer__link"
          >
            GITHUB
          </Link>
          <Link
            to="/"
            className="footer__link"
          >
            CONTACTS
          </Link>
          <Link
            to="/"
            className="footer__link"
          >
            RIGHTS
          </Link>
        </div>
      </div>

      <div className="footer__button_container">
        <div className="footer__content">
          <div className="footer__button_text">Back to top</div>
        </div>
        <button
          type="button"
          aria-label="Scroll top"
          className="footer__button"
          onClick={scrollToTop}
        />
      </div>
    </footer>
  );
};
