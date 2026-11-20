import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useStateContext } from './hooks/useStateContext';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { SearchWindow } from './components/SearchWindow';

import styles from './App.module.scss';

export const App = () => {
  const { isOpenWindow } = useStateContext();

  return (
    <div className={styles.app}>
      <Header />

      <Sidebar />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />

      {isOpenWindow && <SearchWindow />}

      <ToastContainer />
    </div>
  );
};
