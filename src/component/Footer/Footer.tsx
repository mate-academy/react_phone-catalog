import { Link } from 'react-router-dom';

export const Footer = () => {
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/" target="_top" className="footer__logo" />

          <div className="footer__wrap">
            <Link
              to="https://github.com/Misha408"
              target="_blank"
              className="footer__link"
            >
              Github
            </Link>

            <Link to="/contacts" className="footer__link">
              Contacts
            </Link>

            <Link to="/rights" className="footer__link">
              rights
            </Link>
          </div>

          <div className="footer__top">
            <p className="footer__top__text"> Back to top </p>

            <button
              type="button"
              className="footer__top__button"
              onClick={() => scrollUp()}
            >
              <img
                src="./icon/Up.svg"
                alt="UP"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
