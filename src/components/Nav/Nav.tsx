import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

type Props = {
  pages: string[];
  pathname: string;
};

const Nav: React.FC<Props> = ({ pages, pathname }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        {pages.map((page, index) => {
          const link = `/${page.toLowerCase()}`;

          const activePage =
            pathname === link || (pathname === '/' && page === 'Home');

          return (
            <li
              key={index}
              className={`${styles.nav__item} ${activePage && `${styles.nav__item_active}`}`}
            >
              <NavLink to={link}>{page}</NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
