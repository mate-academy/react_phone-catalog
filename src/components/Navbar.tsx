import { CustomNavLink } from './CustomNavLink';

export const Navbar = () => {
  const urls = ['home', 'phones', 'tablets', 'accessories'];

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {
          urls.map(item => (
            <li className="navbar__item" key={item}>
              <CustomNavLink
                to={item === 'home' ? '/' : item}
                classes="navbar__link"
                activeClass="navbar__link--active"
              >
                {item}
              </CustomNavLink>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};
