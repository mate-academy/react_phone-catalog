import { BeatLoader } from 'react-spinners';
import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <BeatLoader color="#89939a" size={20} />
    </div>
  );
};
