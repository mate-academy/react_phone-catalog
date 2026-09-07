import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

const NAVIGATION: string[] = ['home', 'phones', 'tablets', 'accessories'];

type Props = {
  className: string;
  setIsMenuOpen: (value: boolean) => void;
};

export const Navigation: React.FC<Props> = ({ className, setIsMenuOpen }) => {
  return (
    <nav className={styles[className]}>
      <ul className={styles[`${className}__list`]}>
        {NAVIGATION.map(link => (
          <li key={link} className={styles[`${className}__item`]}>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to={link === 'home' ? '/' : `/${link}`}
              className={({ isActive }) =>
                isActive
                  ? `${styles[`${className}__link`]} ${styles[`${className}__link--active`]}`
                  : styles[`${className}__link`]
              }
            >
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
