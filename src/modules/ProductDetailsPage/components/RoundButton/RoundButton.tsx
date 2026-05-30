import React from 'react';
import styles from './RoundButton.module.scss';
import cn from 'classnames';

type Props = {
  color: string;
  isActive?: boolean;
  onClick?: () => void;
};

export const RoundButton: React.FC<Props> = ({
  color,
  isActive = false,
  onClick = () => {},
}) => {
  return (
    <button
      type="button"
      className={cn(`${styles.btn}`, {
        [styles[`btn--active`]]: isActive,
      })}
      onClick={onClick}
    >
      <span className={styles.btn__color} style={{ backgroundColor: color }} />
    </button>
  );
};
