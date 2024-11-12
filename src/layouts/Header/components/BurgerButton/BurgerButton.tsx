import { useMemo } from 'react';

import cn from 'classnames';

import BurgerIcon from '@assets/images/icons/burger-icon.svg?react';
import CloseIcon from '@assets/images/icons/close-icon.svg?react';

import { DefaultProps } from '@shared/types/common';

import styles from './BurgerButton.module.scss';

interface BurgerButtonProps extends DefaultProps {
  isOpen: boolean;
  onClick?: VoidFunction;
}

export const BurgerButton: React.FC<BurgerButtonProps> = ({
  isOpen,
  className,
  onClick,
  ...rest
}) => {
  const Icon = useMemo(() => (isOpen ? CloseIcon : BurgerIcon), [isOpen]);

  return (
    <button className={cn(styles.btn, className)} onClick={onClick} {...rest}>
      <Icon />
    </button>
  );
};
