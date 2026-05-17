import { ChangeEvent, useEffect, useState } from 'react';
import { SearchIcon } from '../../../../shared/UI/Icon/SearchIcon';
import { TextInput } from '../../../../shared/UI/Inputs/TextInput';
import { useSearchWith } from '../../hooks/useSearchWith';
import styles from './SearchInput.module.scss';
import { useDebounce } from '../../hooks/useDebounce';
import { useTranslation } from 'react-i18next';

export const SearchInput = () => {
  const { t } = useTranslation();
  const { searchParams, setSearchWith } = useSearchWith();
  const searchValue = searchParams.get('query') || '';

  const [value, setValue] = useState<string>(searchValue);

  const debonceValue = useDebounce(value, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setSearchWith({
      query: debonceValue.trim() || null,
      page: null,
    });
  }, [debonceValue]);

  return (
    <div className={styles.inputContainer}>
      <TextInput
        value={value}
        onChange={handleChange}
        type="text"
        placeholder={t('catalog_pages.search.placeholder')}
        classNames={styles.input}
      />

      <div className={styles.icon}>
        <SearchIcon />
      </div>
    </div>
  );
};
