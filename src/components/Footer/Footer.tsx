import { NavLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__nav">
          <nav className="footer__nav-bar">
            <NavLink to="/" className="logo icon" />
            <ul className="menu__list">
              <li className="menu__item">
                <NavLink
                  to="#/"
                  className="menu__link"
                  target="_blank"
                >
                  Github
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="#/"
                  className="menu__link"
                  target="_blank"
                >
                  Contacts
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="#/"
                  className="menu__link"
                  target="_blank"
                >
                  rights
                </NavLink>
              </li>
            </ul>
            <div className="to-top__block">
              Back to top
              <NavLink className="to-top__button icon" to="/" />
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};
