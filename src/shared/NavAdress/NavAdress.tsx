import { Link, useLocation } from 'react-router-dom';
import styles from './NavAdress.module.scss';
import { Products } from '../types/Products';
import { useTheme } from '../../context/PageTheme';

export const NavAdress: React.FC = () => {
  const location = useLocation();
  const places = location.pathname.split('/').filter(Boolean);
  const { theme } = useTheme();

  return (
    <div className={styles.navAdress}>
      <Link className={styles.homeLink} to="/">
        <img
          src={
            theme === 'light'
              ? `${import.meta.env.BASE_URL}/img/icons/Home.svg`
              : `${import.meta.env.BASE_URL}/img/icons/dark__home.svg`
          }
          alt="Icon Home"
          className={styles.navAdress__icon}
        />
        {'> '}
      </Link>
      {places.map((path, index) => {
        const pathTo = `/${places.slice(0, index + 1).join('/')}`;

        return (
          <span className={styles.span} key={path}>
            <Link
              style={{
                color: Object.values(Products).includes(path as Products)
                  ? theme === 'light'
                    ? '#0F0F11'
                    : '#fff'
                  : theme === 'light'
                    ? '#89939A'
                    : '#E2E6E9',
              }}
              className={styles.link}
              to={pathTo}
            >
              {path}
            </Link>
            {index < places.length - 1 && ' > '}
          </span>
        );
      })}
    </div>
  );
};
