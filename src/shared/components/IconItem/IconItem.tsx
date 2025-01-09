import { NavLink } from 'react-router-dom';
import s from '../Header/Header.module.scss';
import style from '../Navbar/Navbar.module.scss';

type Props = {
  isMenuOpen: boolean;
  icon: string;
  route: string;
  notification: number;
};

export const IconItem: React.FC<Props> = ({
  isMenuOpen,
  icon,
  route,
  notification,
}) => {
  return (
    <li
      className={`${s.icons__item} ${isMenuOpen ? s.active : ''} ${s['icons__list--item']}`}
    >
      <NavLink
        to={route}
        className={({ isActive }) =>
          `${s['icons__item--link']} ${style.navbar__item} ${isActive ? style['is-active'] : ''}`
        }
      >
        <div className={s.NotifictionField}>
          <img src={icon} alt="icon" className={s['icons__item--image']} />
          {notification > 0 && (
            <div className={s.Notifiction}>{notification}</div>
          )}
        </div>
      </NavLink>
    </li>
  );
};
