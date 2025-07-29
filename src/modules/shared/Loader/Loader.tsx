import { FC } from 'react';
import styles from './Loader.module.scss';

export const Loader: FC = () => (
  <div className={styles.loader}>
    <div className={styles.loaderContent}></div>
  </div>
);
