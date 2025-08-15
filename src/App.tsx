import { Outlet } from 'react-router-dom';
import styles from './styles/index.module.scss';

export const App = () => (
  <div className="App">
    <h1 className={styles.sr_only}>Product Catalog</h1>

    <Outlet />
  </div>
);
