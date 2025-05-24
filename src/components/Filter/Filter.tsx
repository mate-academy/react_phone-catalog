import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { searchedFilterStatus } from '../../features/filter';
import './Filter.scss';

export const Filter: React.FC = () => {
  const dispatch = useDispatch();

  const filterStatus = useSelector(
    (state: RootState) => state.filter.filterStatus,
  );

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(searchedFilterStatus(event.target.value));
  };

  return (
    <>
      <form className="field has-addons" onSubmit={e => e.preventDefault()}>
        <p className="control">
          <span className="select">
            <select
              className="select__field "
              data-cy="statusSelect"
              value={filterStatus}
              onChange={handleStatusChange}
            >
              <option value="newest">Newest</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </span>
        </p>
      </form>
    </>
  );
};

export default Filter;
