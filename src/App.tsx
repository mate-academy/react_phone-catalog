/* eslint-disable max-len */
import styles from './App.module.scss';
import { Header } from './modules/shared/components/Header';
import { Main } from 'modules/shared/components/Main';
import { Footer } from './modules/shared/components/Footer/Footer';
import { MenuProvider } from 'modules/shared/components/Header/components/Menu/MenuContext';

export const App = () => (
  <MenuProvider>
    <div className={styles.App}>
      <Header />

      <Main />

      <Footer />
    </div>
  </MenuProvider>
);
