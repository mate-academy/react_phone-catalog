import './Footer.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer page__section-footer">
      <div className="footer__left-box">
        <a
          href="/"
          className="logo"
        >
          <img
            src="img/Icons/logo-new.svg"
            alt="my-phone-logo"
            className="logo__img footer__logo"
          />
        </a>
      </div>
      <div className="footer__center-box">
        <nav className="nav nav--mob-no-display">
          <ul className="nav__list">
            <li className="nav__item">
              <a
                href="https://github.com/valntyn"
                className="nav__link"
                rel="noreferrer"
                target="_blank"
              >
                Github
              </a>
            </li>
            <li className="nav__item">
              <a
                href="https://github.com/valntyn"
                className="nav__link"
                rel="noreferrer"
                target="_blank"
              >
                Contacts
              </a>
            </li>
            <li className="nav__item">
              <a
                href="https://github.com/valntyn"
                className="nav__link"
                rel="noreferrer"
                target="_blank"
              >
                Rights
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer__right-box">
        <p className="footer__link-home">
          Back to top
        </p>
        <button
          type="button"
          className="button footer__button"
          onClick={scrollToTop}
        >
          <div className="footer__arr footer__arr--up"> </div>
        </button>
      </div>
    </footer>
  );
};
