import { useEffect } from 'react';
import styles from './style.module.scss';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <aside className={styles.sideMenu} id="burger-menu">
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
      </aside>
    </>
  );
};

export default Sidebar;
