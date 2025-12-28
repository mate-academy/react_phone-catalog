import Header from '@/organisms/Header/Header';
import styles from './Layout.module.scss';
import Aside from '@/molecules/Aside';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <input
        type="checkbox"
        name="menu"
        id="menu-checkbox"
        className="checkbox"
      />
      <Header />
      <Aside />
    </div>
  );
};

export default Layout;
