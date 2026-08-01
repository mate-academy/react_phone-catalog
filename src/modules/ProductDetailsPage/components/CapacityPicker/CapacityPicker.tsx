import cn from 'classnames';
import { useTranslation } from '@shared/context';
import styles from './CapacityPicker.module.scss';

interface Props {
  capacities: string[];
  selectedCapacity: string;
  isCapacityAvailable: (capacity: string) => boolean;
  onSelect: (capacity: string) => void;
}

export const CapacityPicker: React.FC<Props> = ({
  capacities,
  selectedCapacity,
  isCapacityAvailable,
  onSelect,
}) => {
  const { t } = useTranslation();

  return (
    <fieldset className={styles.picker}>
      <legend className={styles.label}>{t('details.selectCapacity')}</legend>

      <div className={styles.list}>
        {capacities.map(capacity => (
          <label
            key={capacity}
            className={cn(styles.capacity, {
              [styles.capacitySelected]: capacity === selectedCapacity,
            })}
          >
            <input
              type="radio"
              name="capacity"
              value={capacity}
              className="visually-hidden"
              checked={capacity === selectedCapacity}
              disabled={!isCapacityAvailable(capacity)}
              onChange={() => onSelect(capacity)}
            />

            {capacity}
          </label>
        ))}
      </div>
    </fieldset>
  );
};
