import { Link } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const Footer = () => (
  <>
    <footer className="footer">
      <div className="container">
        <div className="footer__content">

          <Link
            to="/"
            className="logo footer__logo"
          >
            <img
              className="logo__img"
              src="new/img/logo/logo.svg"
              alt="logo"
            />
          </Link>

          <div className="footer__links">
            <a
              href="https://github.com/allagutsul27"
              className="footer__link-github"
            >
              GITHUB
            </a>
            <a
              href="https://github.com/allagutsul27"
              className="footer__link-contacts"
            >
              CONTACTS
            </a>
            <a
              href="https://github.com/allagutsul27"
              className="footer__link-rights"
            >
              RIGHTS
            </a>
          </div>

          <div className="footer__back">
            <div className="footer__back-content">
              Back to top
            </div>

            <button
              type="button"
              className="footer__back-btn"
              onClick={scrollToTop}
            >
              <img
                className="footer__back-btn-img"
                src="new/img/icons/arrow-top.svg"
                alt="arrow-top"
              />
            </button>
          </div>
        </div>
      </div>

    </footer>
  </>
);
