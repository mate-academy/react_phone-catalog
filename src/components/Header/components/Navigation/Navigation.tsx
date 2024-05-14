import { NavIcons } from './components/NavIcons';
import './Navigation.scss';
import { NavLink } from 'react-router-dom';
type Props = {
  className: 'header__nav' | 'menu__nav';
};

export const Navigation: React.FC<Props> = ({ className }) => {
  return (
    <>
      <nav className={`${className} nav__list`}>
        <ul className={`nav ${className}__list nav__list`}>
          <li className="nav--item">
            <NavLink to="/" className="nav--link">
              HOME
            </NavLink>
          </li>
          <li className="nav--item">
            <NavLink to="phones" className="nav--link">
              PHONES
            </NavLink>
          </li>
          <li className="nav--item">
            <NavLink to="tablets" className="nav--link">
              TABLETS
            </NavLink>
          </li>
          <li className="nav--item">
            <NavLink to="accessories" className="nav--link">
              ACCESSORIES
            </NavLink>
          </li>
        </ul>
        <NavIcons className={className} />
      </nav>
    </>
  );
};
