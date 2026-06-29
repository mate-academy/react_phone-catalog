import styles from './InputSearch.module.scss';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductPageSearchParams } from '../../ProductPage/ProductPage.types';
import { HOME_CATEGORIES_LIST } from '../../constants';

const InputSearch: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchString, setSearchString] = useState(
    searchParams.get(ProductPageSearchParams.query) || '',
  );

  const isCatalogPage = HOME_CATEGORIES_LIST.includes(
    pathname.replace('/', ''),
  );

  if (!isCatalogPage) {
    return null;
  }

  const handleChange = (currentString: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentString.trim()) {
      params.set(ProductPageSearchParams.query, currentString.trim());
    } else {
      params.delete(ProductPageSearchParams.query);
    }

    setSearchParams(params.toString());
    setSearchString(currentString);
  };

  return (
    <div className="container">
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
          <button
            className={styles.inputSearch__close}
            title="clear"
            onClick={() => handleChange('')}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputSearch;
