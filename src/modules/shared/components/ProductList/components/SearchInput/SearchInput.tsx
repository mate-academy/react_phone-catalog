//#region imports
import { ChangeEvent, FC, useRef, useState } from 'react';
import { CloseIcon } from '../../../CloseIcon';
import { SearchIcon } from './components/SearchIcon';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';
import styles from './SearchInput.module.scss';
import { useTranslation } from 'react-i18next';
//#endregion

type Props = {
  placeholder: string;
  debounceMs?: number;
  onParamChange: (newValue: string | null) => void;
};

export const SearchInput: FC<Props> = ({
  placeholder,
  debounceMs = 400,
  onParamChange,
}) => {
  const { t } = useTranslation('shared');

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const [inputValue, setInputValue] = useState(query);

  //#region handlings
  const updateParam = useRef(
    debounce((newValue: string) => {
      onParamChange(newValue || null);
    }, debounceMs),
  ).current;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setInputValue(newValue);
    updateParam(newValue);
  };

  const handleClear = () => {
    setInputValue('');
    onParamChange(null);
  };
  //#endregion

  return (
    <div className={styles.searchInputWrapper} role="search">
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>

      <input
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className={styles.searchInput}
        autoComplete="off"
      />

      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className={styles.searchClear}
          aria-label={t('searchClear')}
        >
          <CloseIcon type="delete" />
        </button>
      )}
    </div>
  );
};
