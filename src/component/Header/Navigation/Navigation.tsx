import { NavLink } from 'react-router-dom';
import style from './Navigation.module.scss';

interface Link {
  title: string;
  path: string;
}

interface Props {
  links: Link[];
}

export const Navigation: React.FC<Props> = ({ links }) => {
  return (
    <nav className={style.navbar}>
      <ul className={style.navbar__list}>
        {links.map(({ title, path }) => (
          <li className={style.navbar__item} key={title}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${style.navbar__link} ${style['navbar__link--active']}`
                  : style.navbar__link
              }
              to={path}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
