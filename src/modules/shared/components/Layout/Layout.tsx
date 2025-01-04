import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import styles from './Loyout.module.scss';
import { useRef } from 'react';

const Layout = () => {
  const headerRef = useRef<HTMLElement>(null);

  const scroleToHeader = () => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.wrapper}>
      <span ref={headerRef}></span>
      <Header/>
      <main  className={styles.wrapper__main}>
        <Outlet />
      </main>
      <footer className={styles.wrapper__footer}>
        <Footer scroleToHeader={scroleToHeader} />
      </footer>
    </div>
  );
};

export default Layout;
