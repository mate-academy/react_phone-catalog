import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './SortForm.scss';
import { setProductsPerPage } from '../../redux/reducers/paginationReducer';
import { SELECT } from '../../types/Select';
import { setSortBy } from '../../redux/reducers/sortReducer';
import { SORT } from '../../types/Sort';

export const SortForm = () => {
  const perPage = useAppSelector(state => state.pagination.productsPerPage);
  const sortBy = useAppSelector(state => state.sort.sortBy);
  const dispatch = useAppDispatch();

  const handleProductsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newProductsPerPage = parseInt(event.target.value, 10);

    dispatch(setProductsPerPage(newProductsPerPage));
  };

  return (
    <div className="sortForm">
      <div className="sortForm__form">
        <label htmlFor="sort-select1" className="sortForm__label">
          Sort By
        </label>
        <select
          id="sort-select1"
          className="sortForm__select"
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as SORT))}
        >
          <option value="" disabled>Please select option</option>
          <option value={SORT.Newest}>Newest</option>
          <option value={SORT.Alphabetically}>Alphabetically</option>
          <option value={SORT.Cheapest}>Cheapest</option>
        </select>
      </div>
      <div className="sortForm__form">
        <label htmlFor="sort-select1" className="sortForm__label">
          Items on page
        </label>
        <select
          id="sort-select1"
          className="sortForm__select"
          value={perPage}
          onChange={handleProductsPerPageChange}
        >
          <option value={SELECT.All}>All</option>
          <option value={SELECT.Four}>4</option>
          <option value={SELECT.Eight}>8</option>
          <option value={SELECT.Sixteen}>16</option>
        </select>
      </div>
    </div>
  );
};
