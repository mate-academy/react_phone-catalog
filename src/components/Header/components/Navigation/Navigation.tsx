import classNames from 'classnames';
import { NavIcons } from './components/NavIcons';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

type Props = {
  className?: string;
};

export const Navigation: React.FC<Props> = ({ className = '' }) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(`text--small nav__link`, {
      'navlink--underline': isActive,
      'link--underline': !isActive,
    });

  return (
    <>
      <nav className={`${className} nav`}>
        <ul className={`${className}__list nav__list`}>
          <li className="nav__item">
            <NavLink to="/" className={getLinkClass}>
              HOME
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/phones" className={getLinkClass}>
              PHONES
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/tablets" className={getLinkClass}>
              TABLETS
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/accessories" className={getLinkClass}>
              ACCESSORIES
            </NavLink>
          </li>
        </ul>
        <NavIcons className={className} />
      </nav>
    </>
  );
};
