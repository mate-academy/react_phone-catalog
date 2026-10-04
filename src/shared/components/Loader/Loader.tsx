import { Oval } from 'react-loader-spinner';
import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.loader}>
    <Oval height={30} width={30} color="#313237" />

    <p className="loader__text">Loading data...</p>
  </div>
);
