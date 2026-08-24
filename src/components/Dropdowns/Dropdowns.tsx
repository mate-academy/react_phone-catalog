import styles from './dropdowns.module.scss';

interface Option<T> {
  label: string;
  value: T;
}

interface Props<T> {
  title: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export const Dropdowns = <T extends string>({
  title,
  options,
  value,
  onChange,
}: Props<T>) => {
  return (
    <div className={styles.dropdowns}>
      <p className={styles.dropdowns__title}>{title}</p>

      <div className={styles.dropdown}>
        <select
          className={styles.dropdown__select}
          value={value}
          onChange={e => onChange(e.target.value as T)}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className={styles.dropdowns__arrows}>
          <img
            className={styles.dropdowns__arrow}
            src={`${import.meta.env.BASE_URL}/img/icons/ArrowDown.svg`}
            alt="arrow down"
          />
          <img
            className={styles.dropdowns__arrowDark}
            src={`${import.meta.env.BASE_URL}/img/icons-dark/Arrow-Down.svg`}
            alt="arrow down"
          />
        </div>
      </div>
    </div>
  );
};
