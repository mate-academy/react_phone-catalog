import React from 'react';
import styles from './AddToFavourites.module.scss';

type Props = {
  size: 's' | 'm';
};
export const AddToFavourites: React.FC<Props> = ({ size }) => {
  const elementSize =
    size === 's'
      ? { width: '40px', height: '40px' }
      : { width: '48px', height: '48px' };

  return (
    <button style={elementSize} className={styles.addToFavourites}></button>
  );
};
