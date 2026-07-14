import classNames from 'classnames';
import styles from './CapacitySelector.module.scss';
import { SquareButton } from '../../../shared/components/SquareButton';

interface Props {
  capacities: string[];
  currentCapacity: string;
  handleCapacityChange: (capacity: string) => void;
}

export const CapacitySelector: React.FC<Props> = ({
  capacities,
  currentCapacity,
  handleCapacityChange,
}) => {
  return (
    <div className={styles['capacity-selector']}>
      <div className={styles['capacity-selector__header']}>
        <span className={styles['capacity-selector__title']}>
          Select capacity
        </span>
      </div>
      <ul className={styles['capacity-selector__list']}>
        {capacities.map(capacity => (
          <li
            className={classNames(styles['capacity-selector__item'])}
            key={capacity}
          >
            <SquareButton
              className={classNames(styles['capacity-selector__option'], {
                [styles['capacity-selector__option--active']]:
                  currentCapacity === capacity,
              })}
              onClick={() => handleCapacityChange(capacity)}
            >
              {capacity}
            </SquareButton>
          </li>
        ))}
      </ul>
    </div>
  );
};
