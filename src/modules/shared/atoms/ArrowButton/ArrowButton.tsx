import React from 'react';
import styles from './ArrowButton.module.scss';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { ArrowIcon } from '../../../../assets/icons/arrow-icon';
import { ButtonProps } from '../Button';
import classNames from 'classnames';

interface Props extends Omit<ButtonProps, 'children'> {
  direction?: 'left' | 'up' | 'right' | 'down';
}

export const ArrowButton: React.FC<Props> = ({
  direction = 'left',
  className,
  ...props
}) => {
  return (
    <IconButton className={classNames(styles.arrow, className)} {...props}>
      <Icon direction={direction}>
        <ArrowIcon />
      </Icon>
    </IconButton>
  );
};
