import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import { useEffect } from 'react';

export enum SortParametr {
  DEFAULT = 'default',
  NAME = 'name',
  DATE = 'newest',
  PRICE = 'price',
}

export enum PaginationNumber {
  Eight = '8',
  Twelve = '12',
  Sixteen = '16',
  Twenty = '20',
}

export const FilterProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const changeOrderParameter = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setSearchWith({
      sort: event.target.value as SortParametr,
      page: '1',
    });
  };

  const changePagination = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWith({
      perPage: event.target.value as PaginationNumber,
      page: '1',
    });
  };

  useEffect(() => {
    setSearchWith({
      sort: SortParametr.DEFAULT,
      perPage: PaginationNumber.Eight,
      page: '1',
    });
  }, []);

  return (
    <div className="filter-product">
      <div className="filter-product__item">
        <label className="filter-product__input" htmlFor="sortBySelector">
          Sort By
        </label>
        <select
          id="sortBySelector"
          className="filter-product__selector"
          defaultValue={SortParametr.DEFAULT}
          onChange={changeOrderParameter}
        >
          <option value={SortParametr.DEFAULT}>{SortParametr.DEFAULT}</option>
          <option value={SortParametr.NAME}>{SortParametr.NAME}(a-z)</option>
          <option value={SortParametr.PRICE}>
            {SortParametr.PRICE}(lowest)
          </option>
          <option value={SortParametr.DATE}>{SortParametr.DATE}</option>
        </select>
      </div>
      <div className="filter-product__item">
        <label className="filter-product__input" htmlFor="paginationNumber">
          Items on page
        </label>
        <select
          id="paginationNumber"
          className="filter-product__selector"
          defaultValue={PaginationNumber.Eight}
          onChange={changePagination}
        >
          <option value={PaginationNumber.Eight}>
            {PaginationNumber.Eight}
          </option>
          <option value={PaginationNumber.Twelve}>
            {PaginationNumber.Twelve}
          </option>
          <option value={PaginationNumber.Sixteen}>
            {PaginationNumber.Sixteen}
          </option>
          <option value={PaginationNumber.Twenty}>
            {PaginationNumber.Twenty}
          </option>
        </select>
      </div>
    </div>
  );
};
