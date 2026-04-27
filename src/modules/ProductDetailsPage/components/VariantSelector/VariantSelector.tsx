import classNames from 'classnames';
import {
  formatColorLabel,
  normalizeColorToken,
} from '../../../shared/utils/catalog';
import styles from './VariantSelector.module.scss';

interface Props {
  label: string;
  name: string;
  options: string[];
  selectedValue: string;
  type?: 'color' | 'capacity';
  onChange: (value: string) => void;
}

export const VariantSelector = ({
  label,
  name,
  options,
  selectedValue,
  type = 'capacity',
  onChange,
}: Props) => (
  <fieldset className={styles.group}>
    <legend className={styles.legend}>{label}</legend>

    <div className={styles.options}>
      {options.map(option => {
        const checked = option === selectedValue;

        return (
          <label
            key={option}
            className={classNames(styles.option, {
              [styles.optionActive]: checked && type === 'capacity',
            })}
          >
            <input
              type="radio"
              name={name}
              checked={checked}
              onChange={() => onChange(option)}
              className="visuallyHidden"
            />

            {type === 'color' ? (
              <span
                className={classNames(
                  styles.colorSwatch,
                  styles[normalizeColorToken(option)],
                )}
                title={formatColorLabel(option)}
              />
            ) : (
              option
            )}
          </label>
        );
      })}
    </div>
  </fieldset>
);
