import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ModelesSortForm.module.scss';

export const ModelsSortForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [querySelectValue, setQuerySelectValue] = useState<string>(
    searchParams.get('sort') || 'age',
  );
  const [quantitySelectValue, setQuantitySelectValue] = useState<string>(
    searchParams.get('quantity') || '16',
  );

  const handleChangeSelectQuery = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuerySelectValue(e.target.value);
  };

  const handleChangeSelectQuantity = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setQuantitySelectValue(e.target.value);
  };

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value === '') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }

    setSearchParams(params);
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value === '') {
      params.delete('quantity');
    } else {
      params.set('quantity', value);
    }

    setSearchParams(params);
  };

  const generalQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeQuantity(e);
    handleChangeSelectQuantity(e);
  };

  const generalSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeSort(e);
    handleChangeSelectQuery(e);
  };

  return (
    <div className={styles['models__sort-form']}>
      <div className={styles['models__sort-formwrapper']}>
        <label
          className={`${styles['model__select-label']} ${styles['model__select-label--longer']}`}
        >
          Sort by
          <select
            value={querySelectValue}
            onChange={e => generalSortChange(e)}
            className={styles.model__select}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </label>
        <label className={styles['model__select-label']}>
          Items on page
          <select
            value={quantitySelectValue}
            onChange={e => generalQuantityChange(e)}
            className={styles.model__select}
          >
            <option value="">16</option>
            <option value="8">8</option>
            <option value="4">4</option>
            <option value="all">all</option>
          </select>
        </label>
      </div>
    </div>
  );
};
