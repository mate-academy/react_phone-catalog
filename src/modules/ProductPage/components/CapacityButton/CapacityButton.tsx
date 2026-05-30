import { FC, MouseEvent } from 'react';

import styles from './CapacityButton.module.scss';
import { Button } from '@/modules/shared/components/Button';
import classNames from 'classnames';

interface Props {
  to: string;
  isSelected: boolean;
  capacity: string;
}

export const CapacityButton: FC<Props> = ({ capacity, isSelected, to }) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isSelected) {
      e.preventDefault();
    }
  };

  return (
    <Button
      variant="outline"
      size="small"
      to={to}
      className={classNames(styles.btn, {
        [styles.isSelected]: isSelected,
      })}
      onClick={handleClick}
    >
      {capacity}
    </Button>
  );
};
