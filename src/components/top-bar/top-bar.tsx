import { NavLink } from 'react-router-dom';
import { Logo } from '../logo';
import { Nav } from '../nav';
import styles from './top-bar.module.scss';
import { Icon } from '../icons';
import { icons } from '../../constants/icons';
import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';

type Props = {
  isMobile: boolean;
};

export const TopBar: React.FC<Props> = ({ isMobile }) => {
  const { openMenu, setOpenMenu } = useContext(ProductContext);

  return (
    <div className={styles.topBar}>
      {!isMobile && (
        <>
          <div className={styles.topBarContent}>
            <Logo withPaddingLeft />
            <Nav />
          </div>
          <div className={styles.topBarButton}>
            <NavLink to="/" className={styles.button}>
              <Icon icon={icons.favorites} />
            </NavLink>
            <NavLink to="/" className={styles.button}>
              <Icon icon={icons.shoppingBag} />
            </NavLink>
          </div>
        </>
      )}
      {isMobile && (
        <>
          <Logo withPaddingLeft />
          <button
            className={styles.topBarBurgerMenu}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <Icon icon={openMenu ? icons.menuClose : icons.menuOpen} />
          </button>
        </>
      )}
    </div>
  );
};
