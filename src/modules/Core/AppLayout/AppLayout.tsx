import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import styles from './AppLayout.module.scss';
import { Loader } from '../../../components/Loader';

type Props = {
  isLoading: boolean;
};

export const AppLayout: React.FC<Props> = ({ isLoading }) => {
  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.content}>
        {isLoading ? <Loader /> : <Outlet />}
      </main>

      <Footer />
    </div>
  );
};
