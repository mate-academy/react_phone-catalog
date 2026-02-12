import React from 'react';

import styles from './RadioColor.module.scss';
import { getProductColors } from '../../../../utils/getProductColor';

type RadioProps = {
  color: string;
  isActive: boolean;
};

type Props = React.InputHTMLAttributes<HTMLInputElement> & RadioProps;

export const RadioColor: React.FC<Props> = ({ color, isActive, ...props }) => {
  return (
    <label className={`${styles.wrap} ${isActive ? styles.isActive : ''}`}>
      <div
        style={{ backgroundColor: getProductColors(color) }}
        className={styles.content}
      >
        <input hidden type="radio" {...props} />
      </div>
    </label>
  );
};
