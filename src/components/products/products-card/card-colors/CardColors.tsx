import { FC } from 'react';

import styles from './CardColors.module.scss';

type TProps = {
  colors?: string[];
};

export const CardColors: FC<TProps> = ({ colors }) => {
  return (
    <>
      {colors && (
        <div className={styles.colors}>
          <span>Available colors</span>
          {colors.map(color => (
            <button
              key={color}
              className={styles.rectangle}
              style={{ background: `${color}` }}
            >
              {color}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
