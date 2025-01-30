import styles from './TextRadio.module.scss';

type Option = {
  label: string;
  value: string;
};

type HandleOptionChange = (newOption: string) => void;

type Props = {
  title: string;
  options: Option[];
  chosenOption: string;
  onChange: HandleOptionChange;
};

export const TextRadio: React.FC<Props> = ({
  title,
  options,
  chosenOption,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newOption = event.currentTarget.value;

    if (newOption !== chosenOption) {
      onChange(newOption);
    }
  };

  return (
    <fieldset>
      <legend className={styles.Legend}>{title}</legend>

      <ul className={styles.Options}>
        {options.map(option => (
          <li key={option.value}>
            <label className={styles.Label}>
              <input
                type="radio"
                value={option.value}
                name={title}
                className={styles.Option}
                checked={chosenOption === option.value}
                onChange={handleChange}
              />

              {option.label}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};
