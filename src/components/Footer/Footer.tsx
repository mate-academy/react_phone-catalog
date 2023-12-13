import { NavLink } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const setActiveClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? 'active' : '';
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleBackToTop();
    }
  };

  return (

    <footer className="footer">
      <nav className="navbar">
        <div className="navbar__container">
          <div className="nav-logo">
            <NavLink
              to="/"
              onClick={handleBackToTop}
            >
              <img src="img/icons/logo.svg" alt="logo" />
            </NavLink>
          </div>
          <div className="nav-links">
            <a
              href="https://github.com/reseneweb/react_phone-catalog"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <NavLink to="/contacts" className={setActiveClass}>
              Contacts
            </NavLink>
            <NavLink to="/rights" className={setActiveClass}>Rights</NavLink>
          </div>
          <button
            type="button"
            className="back-to-top"
            onClick={handleBackToTop}
            onKeyDown={handleKeyDown}
            aria-label="Back to top"
          >
            Back to top
            <div className="icon-container">
              <img
                src="img/icons/arrowRight.svg"
                alt="Go to top"
                className="arrow-icon"
              />
            </div>
          </button>
        </div>
      </nav>
    </footer>
  );
};
