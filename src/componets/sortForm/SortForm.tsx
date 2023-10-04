import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './SortForm.scss';
import { setProductsPerPage } from '../../redux/reducers/paginationReducer';
import { SELECT } from '../../types/Select';
import { setSortBy } from '../../redux/reducers/sortReducer';
import { SORT } from '../../types/Sort';

export const SortForm = () => {
  const [searchParams] = useSearchParams();
  const productsPerPage = useAppSelector(
    state => state.pagination.productsPerPage,
  );
  const sortBy = useAppSelector(state => state.sort.sortBy);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sortParams = searchParams.get('sort') || SORT.None;
  const perPageParams = searchParams.get('limit') || SELECT.All;

  useEffect(() => {
    dispatch(setSortBy(sortParams));
    const perPageNumber = parseInt(String(perPageParams), 10);

    if (!Number.isNaN(perPageNumber)) {
      dispatch(setProductsPerPage(perPageNumber));
    }
  }, [sortParams, perPageParams, dispatch]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortValue = e.target.value;

    searchParams.set('sort', newSortValue);
    navigate(`?${searchParams.toString()}`);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProductsPerPage = e.target.value;

    searchParams.set('limit', newProductsPerPage);
    navigate(`?${searchParams.toString()}`);
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
          onChange={handleSortChange}
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
          value={productsPerPage}
          onChange={handlePerPageChange}
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
