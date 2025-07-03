import { useEffect } from 'react';
import styles from './style.module.scss';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';

interface SidebarProps {
  isOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validIcon = isOpen ? 'icon--close' : 'icon--menu';

  console.log(validIcon);
  console.log(isOpen);

  return (
    <>
      <aside className={styles.sideMenu} id="burger-menu">
        <HeaderLogoMenu
          setIsMenuOpen={setIsMenuOpen}
          iconClass={validIcon}
          isOpen={isOpen}
        />

        <nav className={styles.sideMenu__nav}>
          <ul className={styles['sideMenu__nav-list']}>
            <li className={styles['sideMenu__nav-item']}>
              <a className={styles['sideMenu__nav-link']} href="#home">
                home
              </a>
            </li>
            <li className={styles['sideMenu__nav-item']}>
              <a className={styles['sideMenu__nav-link']} href="#who-we-are">
                phones
              </a>
            </li>
            <li className={styles['sideMenu__nav-item']}>
              <a
                className={styles['sideMenu__nav-link']}
                href="#service-agency"
              >
                tablets
              </a>
            </li>
            <li className={styles['sideMenu__nav-item']}>
              <a className={styles['sideMenu__nav-link']} href="#experience">
                accessories
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.actionsContainer}>
          <div className={styles.heartWrapper}>
            <a href="#">
              <img src="public\img\favourites-(heart-like).svg" alt="heart" />
            </a>
          </div>

          <div className={styles.bagWrapper}>
            <a href="#">
              <img src="public\img\shopping-bag-cart.svg" alt="bag" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
