import { useEffect } from 'react';
import { Nav } from '../nav';
import styles from './menu.module.scss';
import { NavLink } from 'react-router-dom';
import { Icon } from '../icons';
import { icons } from '../../constants/icons';

type Props = {
  openMenu: boolean;
};

export const Menu: React.FC<Props> = ({ openMenu }) => {
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
        <NavLink to="/favorites" className={styles.button}>
          <Icon icon={icons.favorites} />
        </NavLink>
        <NavLink to="/cart" className={styles.button}>
          <Icon icon={icons.shoppingBag} />
        </NavLink>
      </div>
    </aside>
  );
};
