import React from 'react';
import styles from './CustomButton.module.scss';
import { Icon } from '../../../../components/Icon';
import { IconType } from '../../../../types/IconTypes';

type Props = {
  iconType: IconType;
  disabled?: boolean;
  onClick: () => void;
};

export const CustomButton: React.FC<Props> = ({
  iconType,
  disabled,
  onClick,
}) => {
  return (
    <button className={styles.btns} disabled={disabled} onClick={onClick}>
      <Icon type={iconType} />
    </button>
  );
};
