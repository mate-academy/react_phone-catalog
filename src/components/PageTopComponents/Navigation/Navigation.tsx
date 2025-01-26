import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import cl from './Navigation.module.scss';
import { useAppSelector } from '../../../app/hooks';

export enum NavOrigin {
  ONHEADER = 'onHeader',
  ONMENU = 'onMenu',
}

type Props = {
  origin: NavOrigin;
};

const navBarNames = {
  home: {
    en: 'HOME',
    ua: 'ГОЛОВНА',
  },
  phones: {
    en: 'PHONES',
    ua: 'ТЕЛЕФОНИ',
  },
  tablets: {
    en: 'TABLETS',
    ua: 'ПЛАНШЕТИ',
  },
  accessories: {
    en: 'ACCESSORIES',
    ua: 'АКСЕСУАРИ',
  },
};

export const Navigation: React.FC<Props> = ({ origin }) => {
  const { language } = useAppSelector(st => st.global);

  return (
    <ul
      className={cl.nav__list}
      style={{
        flexDirection: origin === 'onHeader' ? 'row' : 'column',
        gap: origin === 'onHeader' ? '7px' : '25px',
      }}
    >
      <li className={cn({ [cl.nav__itemMenu]: origin === 'onMenu' })}>
        <NavLink
          to=""
          className={({ isActive }) =>
            cn(cl.nav__link, {
              [cl.active]: isActive,
              [cl.nav__linkMenu]: origin === 'onMenu',
            })
          }
        >
          {navBarNames.home[language]}
        </NavLink>
      </li>
      <li className={cn({ [cl.nav__itemMenu]: origin === 'onMenu' })}>
        <NavLink
          to="phones"
          className={({ isActive }) =>
            cn(cl.nav__link, {
              [cl.active]: isActive,
              [cl.nav__linkMenu]: origin === 'onMenu',
            })
          }
        >
          {navBarNames.phones[language]}
        </NavLink>
      </li>
      <li className={cn({ [cl.nav__itemMenu]: origin === 'onMenu' })}>
        <NavLink
          to="tablets"
          className={({ isActive }) =>
            cn(cl.nav__link, {
              [cl.active]: isActive,
              [cl.nav__linkMenu]: origin === 'onMenu',
            })
          }
        >
          {navBarNames.tablets[language]}
        </NavLink>
      </li>
      <li className={cn({ [cl.nav__itemMenu]: origin === 'onMenu' })}>
        <NavLink
          to="accessories"
          className={({ isActive }) =>
            cn(cl.nav__link, {
              [cl.active]: isActive,
              [cl.nav__linkMenu]: origin === 'onMenu',
            })
          }
        >
          {navBarNames.accessories[language]}
        </NavLink>
      </li>
    </ul>
  );
};
