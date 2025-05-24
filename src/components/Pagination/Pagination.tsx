import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setPaginationStatus } from '../../features/pagination';

export const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const paginationStatus = useSelector(
    (state: RootState) => state.pagination.paginationStatus,
  );

  const handlePaginationStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    const parsedValue =
      value === 'all' ? 'all' : (parseInt(value, 10) as 4 | 8 | 16);

    dispatch(setPaginationStatus(parsedValue));
  };

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            className="select__field "
            data-cy="statusSelect"
            value={paginationStatus}
            onChange={handlePaginationStatusChange}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </span>
      </p>
    </form>
  );
};

export default Pagination;
