//#region imports
import cn from 'classnames';
import { FC } from 'react';
import baseStyles from './base.module.scss';
import styles from './CapacityItem.module.scss';
//#endregion

type Props = {
  capacity: string;
  isSelected: boolean;
};

const CapacityItem: FC<Props> = ({ capacity, isSelected }) => (
  <div
    className={cn(baseStyles.capacityItem, styles.capacityItem, {
      [styles.selected]: isSelected,
    })}
  >
    {capacity}
  </div>
);

const formatCapacity = (capacity: string): string => {
  return capacity.trim().replace(/(\d+)\s*([a-zA-Z]+)/, '$1 $2');
};

export const renderCapacityItem = (capacity: string, isSelected: boolean) => (
  <CapacityItem capacity={formatCapacity(capacity)} isSelected={isSelected} />
);
