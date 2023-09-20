/* eslint-disable max-len */
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { ProductCard } from '../ProductCard/ProductCard';
import { sortingProducts } from '../../utils/sortingProducts';
import { SortType } from '../../types/sortType';
import { Selector } from '../Selector/Selector';
import { Pagination } from '../Pagination/Pagination';
import { getSearchWith } from '../../utils/getSearchWith';
import { Product } from '../../types/Product';
import { QueryContext } from '../../context/QueryContext';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';

const sortSortBy = ['Newest', 'Alphabetically', 'Cheapest'];
const sortingValues = ['age', 'name', 'price'];
const itemsOnPageARR = ['4', '8', '16', 'all'];
const labels = ['Sort by', 'Items on page'];

type Props = {
  products: Product[];
  title: string;
};

type SearchParams = {
  sort?: string;
  perPage?: string;
  page?: string;
};

export const ProductsList: React.FC<Props> = ({ products, title }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { appliedQuery } = useContext(QueryContext);

  const sort = searchParams.get('sort') || 'age';
  const itemsPerPage = searchParams.get('perPage') || '8';
  const page = parseInt(searchParams.get('page') || '1', 10);

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const [isLoading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(sort);
  const [itemsOnPage, setItemsOnPage] = useState(itemsPerPage);
  const [currentPage, setCurrentPage] = useState(page);

  const sortedProducts = sortingProducts(products, sortBy);

  const filteredProducts = sortedProducts.filter(product => product.name.toLowerCase().includes(appliedQuery.toLowerCase()));

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value as SortType;

    setSortBy(selectedSort);
    setSearchWith({ sort: event.target.value || undefined });
  };

  const getValidPerPageValue = (perPageValue: string) => {
    if (perPageValue === 'all') {
      return sortedProducts.length.toString();
    }

    return perPageValue;
  };

  const handlePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const perPageValue = event.target.value;

    setItemsOnPage(getValidPerPageValue(perPageValue));

    setCurrentPage(1);
    setSearchWith({ perPage: event.target.value || undefined });
  };

  const handleCurrentPage = (currPage: number) => {
    if (currentPage !== currPage) {
      setCurrentPage(currPage);
    }

    setSearchWith({ page: currPage.toString() || undefined });
  };

  useEffect(() => {
    setCurrentPage(1);
    setSearchWith({ page: '1' });
  }, [appliedQuery]);

  const onPage = +getValidPerPageValue(itemsOnPage);

  const startItem = ((currentPage - 1) * onPage);
  const endItem = (currentPage * onPage) > sortedProducts.length
    ? sortedProducts.length
    : startItem + onPage;

  const arrOfItems = filteredProducts.slice(startItem, +endItem);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? <Loader /> : (
        <div className="productsList" data-cy="productList">
          <h2 className="productsList__title">
            {title}
          </h2>
          <p className="productsList__subtitle">{`${products.length} models`}</p>

          <div className="productsList__sort">
            <div className="productsList__sortBy">
              <Selector
                sortBy={sortBy}
                label={labels[0]}
                handleChange={handleSort}
                sortKeys={sortSortBy}
                sortValues={sortingValues}
              />
            </div>

            <div className="productsList__perPage">
              <Selector
                sortBy={itemsOnPage}
                label={labels[1]}
                handleChange={(event) => handlePerPage(event)}
                sortKeys={itemsOnPageARR}
                sortValues={itemsOnPageARR}
              />
            </div>
          </div>

          <div className="productsList__cards">
            {arrOfItems.map(phone => (
              <div className="productsList__card" key={phone.id}>
                <ProductCard product={phone} />
              </div>
            ))}
          </div>

          {arrOfItems.length ? (
            <Pagination
              total={filteredProducts.length}
              perPage={itemsOnPage}
              currentPage={currentPage}
              onPageChange={handleCurrentPage}
            />
          ) : (
            <NoSearchResults />
          )}

        </div>
      )}
    </>
  );
};
