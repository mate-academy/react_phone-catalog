import { Link, NavLink } from 'react-router-dom';

export const Footer = () => {
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="App__footer footer">
      <div className="footer_content">
        <div className="footer__menu">
          <div className="footer__logo logo">
            <NavLink to="/" className="logo-link">
              <img src="img/logo-2x.png" className="logo-img" alt="logo" />
            </NavLink>
          </div>
          <nav className="navbar footer__navbar">
            <NavLink
              to="https://github.com/yuliiaaaaa"
              className="navbar__link"
            >
              Github
            </NavLink>
            <NavLink to="/contacts" className="navbar__link">
              Contacts
            </NavLink>
            <NavLink to="/rights" className="navbar__link">
              Rights
            </NavLink>
          </nav>
          <div className="footer__button">
            <p className="footer__button-text">Back to top</p>
            <div className="footer__icon-block">
              <Link
                to="#page-top"
                className="icon icon--button-to-top"
                onClick={(e) => handleBackToTop(e)}
                aria-label="button-to-top"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
