import { useId } from 'react';
import cn from 'classnames';
import styles from './OptionSelector.module.scss';

export interface Option {
  value: string;
  label: string;
  // css color: the option is shown as a color swatch instead of a text
  color?: string;
  // there is no product with this option
  disabled?: boolean;
}

interface Props {
  name: string;
  options: Option[];
  selected: string;
  labelId: string;
  onChange: (value: string) => void;
}

export const OptionSelector = ({
  name,
  options,
  selected,
  labelId,
  onChange,
}: Props) => {
  const groupName = useId();

  return (
    <div className={styles.group} role="radiogroup" aria-labelledby={labelId}>
      {options.map(({ value, label, color, disabled }) => (
        <label
          key={value}
          className={cn(styles.option, color ? styles.swatch : styles.text, {
            [styles.disabled]: disabled,
          })}
        >
          <input
            type="radio"
            name={`${name}-${groupName}`}
            value={value}
            checked={value === selected}
            disabled={disabled}
            className={styles.radio}
            onChange={() => onChange(value)}
          />

          {color ? (
            <>
              <span
                className={styles.color}
                style={{ backgroundColor: color }}
              />
              <span className="visually-hidden">{label}</span>
            </>
          ) : (
            <span className={styles.caption}>{label}</span>
          )}
        </label>
      ))}
    </div>
  );
};
