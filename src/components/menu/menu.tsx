import { useContext, useEffect } from 'react';
import { Nav } from '../nav';
import styles from './menu.module.scss';
import { NavLink } from 'react-router-dom';
import { Icon } from '../icons';
import { icons } from '../../constants/icons';
import { ProductContext } from '../../context/ProductContext';

export const Menu = () => {
  const { openMenu, setOpenMenu } = useContext(ProductContext);

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`,
      );
    };

    window.addEventListener('resize', setVh);
    setVh();
  });

  useEffect(() => {
    document.body.style.overflow = openMenu ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openMenu]);

  return (
    <aside className={styles.menu}>
      <div className={styles.container}>
        <Nav />
      </div>
      <div className={styles.menuBottom}>
        <NavLink
          to="/favorites"
          className={styles.button}
          onClick={() => setOpenMenu(false)}
        >
          <Icon icon={icons.favorites} />
        </NavLink>
        <NavLink
          to="/cart"
          className={styles.button}
          onClick={() => setOpenMenu(false)}
        >
          <Icon icon={icons.shoppingBag} />
        </NavLink>
      </div>
    </aside>
  );
};
