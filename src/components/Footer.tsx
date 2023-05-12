import { Link } from 'react-router-dom';

export const Footer = () => {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/">
          <img
            src="./img/Logo.svg"
            alt="Logo"
            className="logo"
          />
        </Link>
        <nav className="navbar">
          <ul className="navbar__list">
            <li className="navbar__item">
              <a
                href="https://github.com/volodymir-tymtsias/react_phone-catalog"
                className="navbar__link"
              >
                github
              </a>
            </li>
            <li className="navbar__item">
              <Link to="contacts" className="navbar__link">
                contacts
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="rights" className="navbar__link">
                rights
              </Link>
            </li>
          </ul>
        </nav>
        <div className="footer__back">
          <p>Back to top</p>
          <button
            type="button"
            className="button"
            onClick={backToTop}
          >
            <span className="icon icon--up" />
          </button>
        </div>
      </div>
    </footer>
  );
};
