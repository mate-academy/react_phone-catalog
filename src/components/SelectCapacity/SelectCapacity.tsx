import cn from 'classnames';

import { extractNumberAndSuffix } from '../../utils';

import styles from './SelectCapacity.module.scss';

type Props = {
  onUpdateCapacity: (capacity: string) => void;
  capacities: string[] | undefined;
  updatedCapacity: string;
};

export const SelectCapacity: React.FC<Props> = ({
  capacities = [],
  onUpdateCapacity,
  updatedCapacity,
}) => {
  return (
    <div className={styles.SelectCapacityWrapper}>
      {capacities.map(currentCapacity => (
        <button
          key={currentCapacity}
          onClick={() => onUpdateCapacity(currentCapacity)}
          className={cn(styles.SelectCapacityButton, {
            [styles.SelectCapacityButtonActive]:
              updatedCapacity === currentCapacity,
          })}
        >
          {extractNumberAndSuffix(currentCapacity)}
        </button>
      ))}
    </div>
  );
};
