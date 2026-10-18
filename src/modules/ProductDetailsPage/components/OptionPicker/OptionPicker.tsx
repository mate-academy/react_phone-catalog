import classNames from 'classnames';
import { useId } from 'react';
import styles from './OptionPicker.module.scss';

interface Option {
  value: string;
  label: string;
  isSelected: boolean;
  swatch?: string;
}

interface Props {
  title: string;
  options: Option[];
  onSelect: (value: string) => void;
}

export const OptionPicker = ({ title, options, onSelect }: Props) => {
  const groupName = useId();

  return (
    <fieldset className={styles['option-picker']}>
      <legend className={styles['option-picker__title']}>{title}</legend>

      <div className={styles['option-picker__options']}>
        {options.map(({ value, label, isSelected, swatch }) => (
          <label
            key={value}
            className={classNames(styles['option-picker__option'], {
              [styles['option-picker__option--swatch']]: swatch,
              [styles['option-picker__option--selected']]: isSelected,
            })}
            title={label}
            style={swatch ? { backgroundColor: swatch } : undefined}
          >
            <input
              type="radio"
              name={groupName}
              value={value}
              checked={isSelected}
              className={styles['option-picker__input']}
              onChange={() => onSelect(value)}
            />
            {!swatch && label}
          </label>
        ))}
      </div>
    </fieldset>
  );
};
