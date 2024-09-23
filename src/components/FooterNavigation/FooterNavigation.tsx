import { Link } from 'react-router-dom';

export const FooterNavigation = () => {
  return (
    <nav className="footer-navigation">
      <ul className="footer-navigation__menu-list">
        <li className="footer-navigation__menu-item">
          <a
            target='blank'
            className="footer-navigation__link"
            href="
            https://github.com/mixelio/"
          >
            Github
          </a>
        </li>
        <li className="footer-navigation__menu-item">
          <Link className="footer-navigation__link" to="/">
            Contacts
          </Link>
        </li>
        <li className="footer-navigation__menu-item">
          <Link className="footer-navigation__link" to="/">
            rights
          </Link>
        </li>
      </ul>
    </nav>
  );
};
