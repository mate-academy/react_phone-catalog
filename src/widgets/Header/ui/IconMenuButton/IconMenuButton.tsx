import React from 'react';
import { Icon } from '../../../../shared/Icon';
import styles from './IconMenuButton.module.scss';

type Props = {
  iconId: string,
  onClick: () => void,
};

export const IconMenuButton: React.FC<Props> = ({ iconId, onClick }) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
    >
      <Icon className={styles.icon} id={iconId} />
    </button>
  );
};
