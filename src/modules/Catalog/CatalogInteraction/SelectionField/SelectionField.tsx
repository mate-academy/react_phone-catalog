import { useEffect, useState } from 'react';
import styles from './SelectionField.module.scss';
import { useSearchParams } from 'react-router-dom';

interface SelectionFieldProps {
  selectionType: 'itemsNumber' | 'deviceAge';
  onChange: (T: string) => void;
}

export const SelectionField: React.FC<SelectionFieldProps> = ({
  selectionType,
  onChange,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = searchParams.get('tabs');
  const sort = searchParams.get('sort');

  const [optionsList, setOptionsList] = useState<string[]>([]);
  const [value, setValue] = useState<string>('8');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    setValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    if (selectionType === 'itemsNumber') {
      setOptionsList(['4', '8', '16', '32', '64']);
      if (tabs) {
        setValue(tabs);
      }
    } else {
      setOptionsList(['Newest', 'Alphabetically', 'Cheapest']);
      if (sort) {
        setValue(sort);
      }
    }
  }, [selectionType, tabs, sort]);

  return (
    <select
      className={styles.selectionField__Container}
      value={value}
      onChange={handleChange}
    >
      {optionsList.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
