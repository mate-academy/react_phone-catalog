import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HeaderStyles.module.scss';
import { Logo } from '../Logo/Logo';

export const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.navList}>
          <Logo />

          <div className={styles.burgerLine}>
            <img
              src="/img/Union.svg"
              onClick={() => setIsSidebarOpen(prev => !prev)}
              className={styles.burger}
              alt="Open Menu"
            />
          </div>
        </div>
      </nav>

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <NavBar />
        <NavLink to="/" onClick={() => setIsSidebarOpen(false)}>
          HOME
        </NavLink>
        <NavLink to="/phones" onClick={() => setIsSidebarOpen(false)}>
          PHONES
        </NavLink>
        <NavLink to="/tablets" onClick={() => setIsSidebarOpen(false)}>
          TABLETS
        </NavLink>
        <NavLink to="/accessories" onClick={() => setIsSidebarOpen(false)}>
          ACCESSORIES
        </NavLink>
      </aside>
    </>
  );
};
