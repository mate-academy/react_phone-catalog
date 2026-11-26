import styles from './CapacitySelector.module.scss';

interface CapacitySelectorProps {
  capacities: string[];
  selectedCapacity: string;
  onChange: (capacity: string) => void;
}

export function CapacitySelector({
  capacities,
  selectedCapacity,
  onChange,
}: CapacitySelectorProps): JSX.Element | null {
  if (capacities.length <= 1) {
    return null;
  }

  return (
    <fieldset className={styles.selector}>
      <legend className={styles.legend}>Select capacity</legend>
      <div
        className={styles.options}
        role="radiogroup"
        aria-label="Select capacity"
      >
        {capacities.map(capacity => {
          const isSelected = capacity === selectedCapacity;
          const inputId = `capacity-${capacity}`;

          return (
            <label key={capacity} className={styles.option} title={capacity}>
              <input
                type="radio"
                id={inputId}
                name="capacity"
                value={capacity}
                checked={isSelected}
                onChange={() => onChange(capacity)}
                className={styles.input}
                aria-label={capacity}
              />
              <span className={styles.button} aria-hidden="true">
                {capacity}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
