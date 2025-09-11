import { Footer } from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { TopBar } from './components/topbar';
import styles from './App.module.scss';

export const App = () => {
  return (
    <div className={styles.app}>
      <h1 className={styles.app__title}>Product Catalog</h1>
      <TopBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
