import React from 'react';
import styles from './CapacityButton.module.scss';
import { Button, ButtonProps } from '../../../../shared/atoms/Button';
import classNames from 'classnames';
import { Typography } from '../../../../shared/atoms/Typography';

type Props = ButtonProps & {
  isActive: boolean;
  isAvailable: boolean;
};

export const CapacityButton: React.FC<Props> = ({
  className,
  onClick,
  children,
  isActive,
  isAvailable,
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      className={classNames(
        styles.capacity,
        {
          [styles['capacity--active']]: isActive,
          [styles['capacity--available']]: isAvailable,
        },
        className,
      )}
      {...props}
    >
      <Typography
        variant="buttons"
        // color={isActive ? 'inherit' : 'primary'}
        className={styles.capacity__text}
      >
        {children}
      </Typography>
    </Button>
  );
};
