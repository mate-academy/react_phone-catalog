import styles from './CapacityPicker.module.scss';

type Props = {
  capacities: string[];
  selected: string;
  onChange: (capacity: string) => void;
};

export const CapacityPicker = ({ capacities, selected, onChange }: Props) => (
  <fieldset className={styles.picker}>
    <legend className={styles.legend}>Select capacity</legend>

    <div className={styles.options}>
      {capacities.map(capacity => (
        <label
          key={capacity}
          className={[
            styles.option,
            capacity === selected ? styles.optionActive : '',
          ].join(' ')}
        >
          <input
            type="radio"
            name="capacity"
            value={capacity}
            checked={capacity === selected}
            onChange={() => onChange(capacity)}
            className={styles.input}
          />
          {capacity}
        </label>
      ))}
    </div>
  </fieldset>
);
