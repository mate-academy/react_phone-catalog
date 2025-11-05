import { useSearchParams } from 'react-router-dom';
import { SortDir, SortField } from '../../types/sort';
import styles from './Form.module.scss';
import classNames from 'classnames';
import { getSearchWith } from '../../../../utils/searchHelper';

type SortType = {
  name: string;
  field: SortField;
  direction: SortDir;
};

const sortFieldList: SortType[] = [
  {
    name: 'Newest',
    field: SortField.Year,
    direction: SortDir.ASC,
  },
  {
    name: 'Alphabetically',
    field: SortField.Name,
    direction: SortDir.ASC,
  },
  {
    name: 'Cheapest',
    field: SortField.Price,
    direction: SortDir.ASC,
  },
];

const itemsCountList = [4, 8, 16, 'all'];

export const Form: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'all' ? null : e.target.value;

    setSearchParams(
      getSearchWith(searchParams, {
        perPage: value,
      }),
    );
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = e.currentTarget.value.split(',');

    setSearchParams(
      getSearchWith(searchParams, {
        sort: values[0],
      }),
    );
  };

  return (
    <form className={classNames(styles.form)}>
      <div className={classNames(styles.form__item, styles.form__sort)}>
        <label className={classNames(styles.form__label)} htmlFor="sort">
          Sort by
        </label>
        <select
          className={classNames(styles.form__select)}
          id="sort"
          name="sort"
          value={searchParams.get('sort') || SortField.Year}
          onChange={e => handleSort(e)}
        >
          {sortFieldList.map((opt, i) => (
            <option
              key={i}
              className={classNames(styles.form__option)}
              value={opt.field}
            >
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div className={classNames(styles.form__item, styles.form__sort)}>
        <label className={classNames(styles.form__label)} htmlFor="count">
          Items on page
        </label>
        <select
          className={classNames(styles.form__select)}
          id="count"
          name="count"
          value={searchParams.get('perPage') || 'all'}
          onChange={e => handleCount(e)}
        >
          {itemsCountList.map((c, i) => (
            <option
              key={i}
              className={classNames(styles.form__option)}
              value={c}
            >
              {c}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
