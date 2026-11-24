import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useStateContext } from './hooks/useStateContext';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';
import { SearchWindow } from './components/SearchWindow';

import styles from './App.module.scss';

export const App = () => {
  const { isOpenWindow } = useStateContext();
  const [visibleScrollToTop, setIsVisibleScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisibleScrollToTop(true);
      } else {
        setIsVisibleScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.app}>
      <Header />

      <Sidebar />

      <main className={styles.main}>
        <Outlet />
      </main>

      <div
        className={`${styles['scroll-to-top-wrapper']} ${visibleScrollToTop ? styles['scroll-to-top-wrapper--visible'] : ''}`}
      >
        <ScrollToTop />
      </div>

      <Footer />

      {isOpenWindow && <SearchWindow />}

      <ToastContainer />
    </div>
  );
};
