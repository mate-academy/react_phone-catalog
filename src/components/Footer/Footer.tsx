import './style.scss';

export const Footer: React.FC = () => (
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

        <a className="footer__back-btn" href="/">
          Back to top
          <i className="icon icon--arrow-up footer__back-btn-arow" />
        </a>
      </div>
    </div>
  </footer>
);
