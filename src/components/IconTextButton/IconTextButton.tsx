import styles from './IconTextButton.module.scss';
import { ReactNode } from 'react';

type IconTextButtonProps = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
};

export const IconTextButton = ({
  label,
  icon,
  onClick,
}: IconTextButtonProps) => {
  return (
    <button className={styles.container} onClick={onClick}>
      {icon}
      <span className={styles.container__label}>{label}</span>
    </button>
  );
};
