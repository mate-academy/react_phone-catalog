//react-router
import { useNavigate, useSearchParams } from 'react-router-dom';

//styles
import styles from './FiltersBar.module.scss';

//components
import { Select } from '../Select';

//services
import { getSearchWith } from '../../utils/searchHelper';
import classNames from 'classnames';

export const FiltersBar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');

  return (
    <div className={styles.filtersBar}>
      <div className={styles.selectBlock}>
        <Select
          label="Sort by"
          options={[
            { label: 'Newest', value: 'new' },
            { label: 'Alphabetically', value: 'name' },
            { label: 'Cheapest', value: 'price' },
          ]}
          value={sort || 'new'}
          setter={value =>
            navigate({
              search: getSearchWith(searchParams, {
                sort: value,
                page: '1',
              }),
            })
          }
        />
      </div>

      <div className={classNames(styles.selectBlock, styles.perPageSelect)}>
        <Select
          label="Items on page"
          options={[
            { label: '4', value: '4' },
            { label: '8', value: '8' },
            { label: '16', value: '16' },
            { label: '24', value: '24' },
            { label: 'All', value: 'all' },
          ]}
          value={perPage || '16'}
          setter={value =>
            navigate({
              search: getSearchWith(searchParams, {
                perPage: value,
                page: '1',
              }),
            })
          }
        />
      </div>
    </div>
  );
};
