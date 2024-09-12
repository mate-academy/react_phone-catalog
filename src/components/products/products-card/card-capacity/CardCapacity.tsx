import { FC } from 'react';

import styles from './CardCapacity.module.scss';

type TProps = {
  capacity?: string[];
};

export const CardCapacity: FC<TProps> = ({ capacity }) => {
  return (
    <>
      {capacity && (
        <div className={styles.capacity}>
          <span>Select capacity</span>
          {capacity.map(item => (
            <button key={item} className={styles.rectangle}>
              {item}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
