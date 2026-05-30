import React, { useState } from 'react';
import styles from './SearchItem.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
// eslint-disable-next-line max-len
import { getSearchWith } from '../../../../../modules/ProductsPage/utils/getSearchWith';

type Props = {
  pathname: string;
};

export const SearchItem: React.FC<Props> = ({ pathname }) => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);

    const newParams = getSearchWith({ page: 1, search: value }, searchParams);

    navigate(`${pathname}?${newParams}`);
  };

  return (
    <input
      className={styles.input}
      type="text"
      placeholder={'Enter text'}
      value={query}
      onChange={handleChange}
    />
  );
};
