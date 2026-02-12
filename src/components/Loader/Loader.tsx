import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.page}>
    <ClipLoader color="var(--$color-white)" />
  </div>
);
