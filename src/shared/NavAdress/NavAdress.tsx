import { Link, useLocation } from 'react-router-dom';
import styles from './NavAdress.module.scss';
import { Products } from '../types/Products';

export const NavAdress: React.FC = () => {
  const location = useLocation();
  const places = location.pathname.split('/').filter(Boolean);

  return (
    <div className={styles.navAdress}>
      <Link className={styles.homeLink} to="/">
        <img
          src={`${import.meta.env.BASE_URL}/img/icons/Home.svg`}
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
                  ? '#0F0F11'
                  : '#89939A',
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
