import { Link, useLocation } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import { useMyContext } from '../../Context/ProductContexts';
import { useEffect } from 'react';
import { NavBar } from '../../shared/NavBar';
import { SavedGoods } from '../../shared/SavedGoods';

export const BurgerMenu: React.FC = () => {
  const location = useLocation();
  const { setIsMenuOpen } = useMyContext();
  const links = [
    { path: '/', title: 'Home' },
    { path: '/phones', title: 'phones' },
    { path: '/tablets', title: 'tablets' },
    { path: '/accessories', title: 'accessories' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.BurgerMenu}>
      <NavBar />
      <div className={styles.BurgerMenu_content}>
        <div className={styles.BurgerMenu_pages}>
          {links.map(link => (
            <Link
              key={link.title}
              to={link.path}
              className={`${styles.BurgerMenu_link} ${
                location.pathname === link.path ? styles.isActive : ''
              }`}
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <SavedGoods />
      </div>
    </div>
  );
};
