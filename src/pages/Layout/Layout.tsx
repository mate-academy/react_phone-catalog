import Header from '@/organisms/Header/Header';
import styles from './Layout.module.scss';
import Aside from '@/molecules/Aside';
import Footer from '@/organisms/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <input
        type="checkbox"
        name="menu"
        id="menu-checkbox"
        className={styles.checkbox}
      />
      <Header />
      <Aside />
      <div className={styles.borders}>
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
