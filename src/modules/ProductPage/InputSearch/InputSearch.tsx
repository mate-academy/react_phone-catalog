import styles from './InputSearch.module.scss';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  handleSearchChange: (search: string) => void;
}

const InputSearch: React.FC<Props> = ({ handleSearchChange }) => {
  const { t } = useTranslation();
  const [searchString, setSearchString] = useState('');

  const handleChange = (currentString: string) => {
    setSearchString(currentString);
    handleSearchChange(currentString);
  };

  return (
    <div className={styles.inputSearch}>
      <div className={styles.inputSearch__container}>
        <svg className={styles.inputSearch__icon} viewBox="0 0 24 24">
          <circle
            cx="11"
            cy="11"
            r="8"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
          />
          <line
            x1="21"
            y1="21"
            x2="16.65"
            y2="16.65"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        <input
          className={styles.inputSearch__input}
          name="productCatalogSearch"
          placeholder={t('products_page.search')}
          value={searchString}
          onChange={event => handleChange(event.target.value)}
        />
      </div>
    </div>
  );
};

export default InputSearch;
