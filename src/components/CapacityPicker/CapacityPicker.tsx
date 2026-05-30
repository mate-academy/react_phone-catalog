import styles from './CapacityPicker.module.scss';

interface Props {
  capacities: string[];
  selected: string;
  onChange: (capacity: string) => void;
}

export const CapacityPicker: React.FC<Props> = ({
  capacities,
  selected,
  onChange,
}) => (
  <div className={styles.capacityPicker}>
    <span className={styles.capacityPicker__label}>Select capacity</span>

    <div className={styles.capacityPicker__list}>
      {capacities.map(cap => (
        <button
          key={cap}
          type="button"
          className={`${styles.capacityPicker__btn} ${
            selected === cap ? styles['capacityPicker__btn--active'] : ''
          }`}
          onClick={() => onChange(cap)}
        >
          {cap}
        </button>
      ))}
    </div>
  </div>
);
