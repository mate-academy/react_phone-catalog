import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import cl from './Navigation.module.scss';

export enum NavOrigin {
  ONHEADER = 'onHeader',
  ONMENU = 'onMenu',
}

type Props = {
  origin: NavOrigin;
};

const navBarNames = ['Home', 'Phones', 'Tablets', 'Accessories'];

export const Navigation: React.FC<Props> = ({ origin }) => {
  return (
    <ul
      className={cl.nav__list}
      style={{
        flexDirection: origin === 'onHeader' ? 'row' : 'column',
        gap: origin === 'onHeader' ? '7px' : '25px',
      }}
    >
      {navBarNames.map(name => (
        <li key={name}>
          <NavLink
            to={name === 'Home' ? '' : name.toLowerCase()}
            className={({ isActive }) =>
              cn(cl.nav__link, { [cl.active]: isActive })
            }
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
