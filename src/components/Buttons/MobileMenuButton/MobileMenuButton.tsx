import React from 'react';
import { Icon } from '../../Icon';
import { IconName } from '../../../constants/icons';
import styles from './MobileMenuButton.module.scss';

type Props = {
  iconName: IconName;
  handleClick: () => void;
  ariaLabel: string;
};

export const MobileMenuButton: React.FC<Props> = ({
  iconName,
  handleClick,
  ariaLabel,
}) => (
  <button
    type="button"
    className={styles.mobileButton}
    onClick={handleClick}
    aria-label={ariaLabel}
  >
    <Icon name={iconName} />
  </button>
);
