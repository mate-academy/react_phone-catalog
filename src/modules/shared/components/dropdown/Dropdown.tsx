import React from 'react';

import styles from './Dropdown.module.scss';
import { useSearchParams } from 'react-router-dom';
import { changeSearchParams } from '../../../../utils/changeSearchParams';
import { titleText } from '../../../../utils/titleText';

type Props = {
  title?: string;
  options: string[];
  propertyName: string;
  ignoreValue?: string;
};

export const Dropdown: React.FC<Props> = ({
  options,
  propertyName,
  ignoreValue,
  title,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeOption = searchParams.get(propertyName) || options[0];

  const handleChangeSearchParams = (s: string) => {
    const newParams = s !== ignoreValue ? s : null;

    setSearchParams(
      changeSearchParams(searchParams, { [propertyName]: newParams }),
    );
  };

  return (
    <label className={styles.label}>
      <span>{title}</span>
      <select
        className={styles.selector}
        value={activeOption}
        onChange={e => handleChangeSearchParams(e.target.value)}
        id={propertyName}
      >
        {options.map(o => (
          <option key={o} value={o.toLowerCase()}>
            {titleText(o)}
          </option>
        ))}
      </select>
    </label>
  );
};
