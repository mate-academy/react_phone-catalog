import { ChangeEvent } from 'react';
import styles from './SelectCardPerPage.module.scss';
import { useSearchParams } from 'react-router-dom';

const SelectCardPerPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCardsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const perPage = e.target.value;

    if (perPage === 'all') {
      searchParams.delete('perPage');
      setSearchParams(searchParams);

      return;
    }

    searchParams.set('perPage', perPage);
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.cardPerPage}>
      <span>Items on page</span>
      <div className={styles.select}>
        <select
          defaultValue={searchParams.get('perPage') || 'all'}
          onChange={handleCardsPerPage}
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={16}>16</option>
          <option value={'all'}>All</option>
        </select>
      </div>
    </div>
  );
};

export default SelectCardPerPage;
