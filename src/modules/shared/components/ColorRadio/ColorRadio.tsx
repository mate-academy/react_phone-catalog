import { Fragment } from 'react/jsx-runtime';
import styles from './ColorRadio.module.scss';
import { useId } from 'react';

export type Option = {
  name: string;
  label: string;
  value: string;
};

type HandleColorChange = (colorName: string) => void;

type Props = {
  title: string;
  options: Option[];
  chosenColor: string;
  onChange: HandleColorChange;
};

export const ColorRadio: React.FC<Props> = ({
  title,
  options,
  chosenColor,
  onChange,
}) => {
  const id = useId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.currentTarget.value;

    if (newColor !== chosenColor) {
      onChange(newColor);
    }
  };

  return (
    <fieldset>
      <legend className={styles.Legend}>{title}</legend>

      {options.map(option => (
        <Fragment key={option.name}>
          <label htmlFor={`${option.name}-${id}`} className={styles.Label}>
            {option.label}
          </label>

          <input
            type="radio"
            value={option.name}
            name="color"
            id={`${option.name}-${id}`}
            className={styles.Option}
            style={{ backgroundColor: option.value }}
            checked={chosenColor === option.name}
            onChange={handleChange}
          />
        </Fragment>
      ))}
    </fieldset>
  );
};
