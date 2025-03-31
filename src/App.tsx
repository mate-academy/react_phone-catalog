import { HomePage } from './modules/HomePage';
import { Footer } from './shared/components/Footer';
import { Header } from './shared/components/Header';

import styles from './App.module.scss';

export const App = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <HomePage />
      </main>
      <Footer />
    </>
  );
};
