import React from 'react';

import styles from './CapacityRadio.module.scss';

type RadioProps = {
  capacity: string;
  isActive: boolean;
};

type Props = React.InputHTMLAttributes<HTMLInputElement> & RadioProps;

export const CapacityRadio: React.FC<Props> = ({
  capacity,
  isActive,
  ...props
}) => {
  return (
    <label className={`${styles.wrap} ${isActive ? styles.isActive : ''}`}>
      <span>{capacity}</span>

      <input hidden type="radio" {...props} />
    </label>
  );
};
