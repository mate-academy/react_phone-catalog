import styles from './Filter.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { setStatus } from '../../features/FilterSlice';
import { setStatusPagin, setCurrentPage } from '../../features/PaginationSlice';

import { DropDownMenu } from '../dropDownMenu/DropDownMenu';
import { useSearchParams } from 'react-router-dom';
import { PaginationStatus } from '../../types/pagination';
import { FilteredStatus } from '../../types/filters';

export const Filter = () => {
  const [filterParams, setFilterParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.filter.status);
  const paginationStatus = useAppSelector(state => state.pagination.status);

  const handleStatusChange = (value: FilteredStatus) => {
    dispatch(setStatus(value));
    dispatch(setCurrentPage(1));
    const params = new URLSearchParams(filterParams);

    if (value === 'age') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }

    setFilterParams(params);
  };

  const handleStatusPagination = (value: PaginationStatus) => {
    dispatch(setStatusPagin(value));
    dispatch(setCurrentPage(1));

    const params = new URLSearchParams(filterParams);

    if (value === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', value);
      params.set('page', '1');
    }

    setFilterParams(params);
  };

  return (
    <>
      <form
        className={styles.filter}
        onSubmit={event => event.preventDefault()}
      >
        <div className={styles.filter__drop}>
          <DropDownMenu
            value={status}
            onChange={handleStatusChange}
            type={'filter'}
          />
        </div>
        <div className={styles.filter__pagination}>
          <DropDownMenu
            value={paginationStatus}
            onChange={handleStatusPagination}
            type={'pagination'}

          />
        </div>
      </form>
    </>
  );
};
