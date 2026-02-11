import classNames from 'classnames';
import styles from './OptionsGroup.module.scss';

interface Props {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'color';
}

export const OptionsGroup: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
  variant = 'default',
}) => (
  <div className={styles.group}>
    <p className={styles.label}>{label}</p>
    <div className={styles.options}>
      {options.map(option => (
        <label
          key={option}
          className={classNames(styles.option, styles[variant], {
            [styles.active]: value === option,
          })}
        >
          <input
            type="radio"
            name={label}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            aria-label={variant === 'color' ? option : undefined}
          />
          <span className={styles.tag}>
            {variant === 'color' ? (
              <span
                className={styles.swatch}
                style={{ backgroundColor: option }}
              />
            ) : null}
            <span>{option}</span>
          </span>
        </label>
      ))}
    </div>
  </div>
);
