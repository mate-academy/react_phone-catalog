import styles from './SortSelect.module.scss';

type Props = {
  sort: 'age' | 'title' | 'price';
  setSort: (value: 'age' | 'title' | 'price') => void;
};

export const SortSelect: React.FC<Props> = ({ sort, setSort }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={`sortSelect-${sort}`}>
        Sort by
      </label>

      <select
        id={`sortSelect-${sort}`}
        className={styles.select}
        value={sort}
        onChange={e => setSort(e.target.value as 'age' | 'title' | 'price')}
      >
        <option value="age">Newest</option>
        <option value="title">Alphabetically</option>
        <option value="price">Cheapest</option>
      </select>
    </div>
  );
};
