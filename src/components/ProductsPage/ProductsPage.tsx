import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { PerPageOptions } from '../../types/PerPageOptions';
import { SortType } from '../../types/SortType';
import { QueryParams } from '../../types/QueryParams';
import {
  getDisplayedProducts, getFilteredProducts,
} from '../../utils/productsHelper';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import { ProductsList } from '../ProductsList';
import { NoSearchResults } from '../NoSearchResults';
import { Pagination } from '../Pagination';
import { Dropdown } from '../Dropdown';
import './ProductsPage.scss';

type Props = {
  products: Product[];
  category: string;
};

const PER_PAGE_OPTIONS: PerPageOptions[] = ['4', '8', '16', 'all'];

export const ProductsPage: React.FC<Props> = ({ products, category }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const total = filteredProducts.length;

  const [searchParams, setSearchParams] = useSearchParams();
  const sortType = searchParams.get(QueryParams.Sort) || 'age';
  const currentPage = +(searchParams.get(QueryParams.Page) || 1);
  const perPage = searchParams.get(QueryParams.PerPage) || '16';
  const query = searchParams.get(QueryParams.Query) || '';

  function getSortTypeValue(sortTypeName: string) {
    const fullSortType = Object.entries(SortType)
      .find(([name]) => name === sortTypeName);

    return fullSortType ? fullSortType[1] : SortType.Newest;
  }

  function getSortTypeName(sortTypeValue: string) {
    const fullSortType = Object.entries(SortType)
      .find(([, value]) => value === sortTypeValue);

    return fullSortType ? fullSortType[0] : 'Newest';
  }

  const displayedProducts = useMemo(() => {
    return getDisplayedProducts(filteredProducts, perPage, currentPage);
  }, [filteredProducts, perPage, currentPage]);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handlePerPage = (newPerPage: string) => {
    if (perPage !== newPerPage) {
      setSearchWith({ perPage: newPerPage, page: '1' });
    }
  };

  const handleSort = (newSortTypeName: string) => {
    const newSortType = getSortTypeValue(newSortTypeName);

    if (sortType !== newSortType) {
      setSearchWith({ sort: newSortType });
    }
  };

  useEffect(() => {
    setFilteredProducts(getFilteredProducts(products, query, sortType));
  }, [products, sortType, query]);

  if (query && !filteredProducts.length) {
    return (
      <NoSearchResults />
    );
  }

  return (
    <div className="ProductsPage">
      {query ? (
        <p className="ProductsPage__subtitle">
          {total === 1 ? '1 result' : `${total} results`}
        </p>
      ) : (
        <>
          <h1 className="ProductsPage__title">{category}</h1>
          <p className="ProductsPage__subtitle">{`${products.length} models`}</p>
        </>
      )}

      <div className="ProductsPage__dropdowns">
        <div className="ProductsPage__dropdown ProductsPage__dropdown--sort">
          Sort by

          <Dropdown
            options={Object.keys(SortType)}
            chosenOption={getSortTypeName(sortType)}
            handleOption={handleSort}
          />
        </div>

        <div className="ProductsPage__dropdown ProductsPage__dropdown--page">
          Items on page

          <Dropdown
            options={PER_PAGE_OPTIONS}
            chosenOption={perPage}
            handleOption={handlePerPage}
          />
        </div>
      </div>

      <div className="ProductsPage__list">
        <ProductsList products={displayedProducts} />
      </div>

      {total >= 4 && (
        <Pagination total={total} />
      )}
    </div>
  );
};
