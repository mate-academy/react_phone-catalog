import { Outlet } from 'react-router-dom';
import { Header } from './modules/Header';
import { Footer } from './components/Footer';
import classNames from 'classnames';
import styles from './App.module.scss';

export const App = () => {
  return (
    <div className={classNames(styles.app)}>
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
