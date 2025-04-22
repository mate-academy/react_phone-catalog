import React from 'react';
import { Header } from '../../modules/shared/components/Header';
import { Container } from '../../modules/shared/components/Container';
import { Footer } from '../../modules/shared/components/Footer';

import styles from './MainLayout.module.scss';

type Props = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.pageContent}>
      <Header />
      <h1 hidden>Product Catalog</h1>

      <main className={styles.main}>
        <Container>{children}</Container>
      </main>

      <Footer />
    </div>
  );
};
