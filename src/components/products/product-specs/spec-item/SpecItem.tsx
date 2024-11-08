import { FC } from 'react';

import styles from './SpecItem.module.scss';

type TProps = {
  label: string;
  value: string | undefined;
};

export const SpecItem: FC<TProps> = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className={styles.spec}>
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
};
