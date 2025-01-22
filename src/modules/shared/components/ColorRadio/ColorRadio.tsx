import styles from './ColorRadio.module.scss';

export type Option = {
  label: string;
  value: string;
  colorValue: string;
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.currentTarget.value;

    if (newColor !== chosenColor) {
      onChange(newColor);
    }
  };

  return (
    <fieldset>
      <legend className={styles.Legend}>{title}</legend>

      <ul className={styles.Options}>
        {options.map(option => (
          <li key={option.value}>
            <label htmlFor={option.value} className={styles.Label}>
              {option.label}
            </label>

            <input
              type="radio"
              value={option.value}
              name={title}
              id={option.value}
              className={styles.Option}
              style={{ backgroundColor: option.colorValue }}
              checked={chosenColor === option.value}
              onChange={handleChange}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  );
};
