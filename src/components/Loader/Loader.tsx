import { ring } from 'ldrs';

import styles from './Loader.module.scss';

export const Loader = () => {
  ring.register();

  return (
    <div className={styles.loader}>
      <l-ring
        size="40"
        stroke="5"
        bg-opacity="0"
        speed="2"
        color="black"
      ></l-ring>
    </div>
  );
};
