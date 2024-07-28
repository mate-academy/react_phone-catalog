import styles from './Select.module.scss';

type SelectPropsValue = number | string;

type SelectProps = {
  name: string;
  id: string;
  value: SelectPropsValue;
  options: Array<SelectPropsValue>;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select = (props: SelectProps) => {
  const { value, options, onChange, name, id } = props;

  return (
    <div className={styles.select}>
      <select name={name} id={id} value={value} onChange={onChange}>
        {options.map(item => (
          <option key={item} value={item} className={styles.optionName}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
