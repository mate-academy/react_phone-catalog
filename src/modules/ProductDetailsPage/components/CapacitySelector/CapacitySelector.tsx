import styles from './CapacitySelector.module.scss';

type Props = {
  capacities: string[];
  selected: string;
  onSelect: (capacity: string) => void;
};

export const CapacitySelector: React.FC<Props> = ({
  capacities,
  selected,
  onSelect,
}) => {
  if (capacities.length === 0 || capacities[0] === '-') {
    return null;
  }

  return (
    <fieldset className={styles.selector}>
      <legend className={styles.selector__legend}>Select capacity</legend>

      <div className={styles.selector__options}>
        {capacities.map(capacity => (
          <label key={capacity} className={styles.selector__option}>
            <input
              type="radio"
              name="capacity"
              value={capacity}
              checked={capacity === selected}
              onChange={() => onSelect(capacity)}
              className="visually-hidden"
            />
            <span
              className={`${styles.selector__pill} ${
                capacity === selected ? styles['selector__pill--active'] : ''
              }`}
            >
              {capacity}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};
