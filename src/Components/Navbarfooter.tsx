import { NavLink } from 'react-router-dom';
import '../styles/NavbarFooter.scss';

export const NavbarFooter: React.FC = () => {
  return (
    <>
      <nav
        data-cy="nav"
        className="navbar__footer"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar__container__footer">
          <div className="navbar__logo">
            <a
              className="link-svg"
              href="https://github.com/student1232354/react_phone-catalog"
            />
          </div>
        </div>
        <div className="navbar__menu__footer">
          <a
            className="link"
            href="https://github.com/student1232354/react_phone-catalog"
          >
            GITHUB
          </a>
          <NavLink className="link" to="/">
            CONTACTS
          </NavLink>
          <NavLink className="link" to="/">
            RIGHTS
          </NavLink>
        </div>
        <div className="Back__Box">
          <p className="Box__title">Back to top</p>
          <button
            className="Box__Button"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          ></button>
        </div>
      </nav>
    </>
  );
};
