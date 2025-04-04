import { PulseLoader } from 'react-spinners';
import styles from './Loader.module.scss';

type Props = {};

const Loader: React.FC<Props> = () => {
  return (
    <div className={styles.loader}>
      <PulseLoader />
    </div>
  );
};

export default Loader;
