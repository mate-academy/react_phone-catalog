import './style.scss';

export const Footer: React.FC = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer App__footer">
      <div className="container">
        <div className="footer__inner">
          <a href="/">
            <img src="img/header-img/LOGO.png" alt="logo" />
          </a>
          <ul className="footer__info nav">
            <li className="nav__item footer__info-item">
              <a
                target="_blank"
                className="link footer__info-link"
                href="https://github.com/dissolveyo"
                rel="noreferrer"
              >
                Github
              </a>
            </li>

            <li className="nav__item footer__info-item">
              <a
                target="_blank"
                className="link footer__info-link"
                href="https://github.com/dissolveyo"
                rel="noreferrer"
              >
                Contacts
              </a>
            </li>

            <li className="nav__item footer__info-item">
              <a
                target="_blank"
                className="link footer__info-link"
                href="https://github.com/dissolveyo"
                rel="noreferrer"
              >
                Rights
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="footer__back-btn"
            onClick={handleBackToTop}
          >
            <p>Back to top</p>
            <i className="icon icon--arrow-up footer__back-btn-arow" />
          </button>
        </div>
      </div>
    </footer>
  );
};
