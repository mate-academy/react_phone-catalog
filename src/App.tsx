import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { useRef } from 'react';

export const App = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.wrapper} ref={wrapperRef} id="wrapper">
        <main className={styles.main}>
          <div className={styles.container}>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
