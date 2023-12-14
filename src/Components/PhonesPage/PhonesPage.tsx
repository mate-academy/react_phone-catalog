import {
  ChangeEvent, useEffect, useState,
} from 'react';
// import { ProductContext } from '../../contexts/ProductContext';
import './PhonesPage.scss';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ProductCard/ProductCard';
import { getSearchWith } from '../../utils/searchHelper';
import { Pagination } from './Pagination';
import { Product } from '../../types/product';
import { BackLink } from '../BackLink/BackLink';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as productsActions from '../features/ProductsSlicer';

const sortBy = ['No sorting', 'Newest', 'Alphabetically', 'Cheapest'];

export const PhonesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  // const { products } = useContext(ProductContext);
  const { products } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(productsActions.productsInit());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    setSearchParams(getSearchWith(
      searchParams, { page: page.toString() },
    ));
    setCurrentPage(page);
  };

  const options = [
    { value: products?.length || 0, text: 'All' },
    { value: 4, text: '4' },
    { value: 8, text: '8' },
    { value: 16, text: '16' },
  ];

  const [perPage, setPerPage] = useState(options[0].value);

  const [currentPage, setCurrentPage] = useState(1);

  const [sortProducts, setSortProducts] = useState(sortBy[0]);

  const query = searchParams.get('query') || '';

  const filterProducts = (
    sortBy: string,
    products: Product[],
    query: string,
  ) => {
    const sortedProducts = [...products];
    let filteredProducts;

    if (query.trim() === '') {
      filteredProducts = sortedProducts;
    } else {
      filteredProducts = sortedProducts.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    }

    switch (sortBy) {
      case 'No sorting':
        return filteredProducts;
        break;
      case 'Newest':
        filteredProducts = filteredProducts.sort((a, b) => b.year - a.year);
        break;
      case 'Alphabetically':
        filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Cheapest':
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        return filteredProducts;
        break;
    }

    return filteredProducts;
  };

  const proccesedProducts = filterProducts(sortProducts, products, query);

  const filteredProducts = proccesedProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

  const total = products.length;

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(getSearchWith(
      searchParams, { sortBy: event.target.value },
    ));
    setSortProducts(event.target.value);
  };

  const handleValueChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(getSearchWith(
      searchParams, { value: event.target.value },
    ));
    setPerPage(+event.target.value);
  };

  useEffect(() => {
    const selectedValue = parseInt(searchParams.get('value') || filteredProducts.length.toString(), 10);

    setPerPage(selectedValue);
  }, [searchParams, filteredProducts]);

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get('page') || '1', 10);

    setCurrentPage(pageFromParams);
  }, [searchParams]);

  useEffect(() => {
    const selectedSort = searchParams.get('sortBy') || sortProducts;

    setSortProducts(selectedSort);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="phones">
      {query && (
        <div>
          <h3 className="phones__subtitle">{`${proccesedProducts.length} results`}</h3>
          <div className="phones__list">
            {proccesedProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          {!proccesedProducts.length
        && (
          <h1 className="phones__title">
            there are no products matching your requests
          </h1>
        )}
        </div>
      )}

      {!query && (
        <div className="phones-container">
          <BackLink text="Phones" />
          <h1 className="phones__title">Page with phones</h1>
          <h3 className="phones__subtitle">{`${products.length} models`}</h3>
          <div className="phones__main-container">
            <div className="phones-container">
              <h1 className="phones__subtitle phones__subtitle_little">Sort by</h1>
              <select className="phones__select" value={sortProducts} onChange={handleSortChange}>
                {sortBy.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="phones-container">
              <h1 className="phones__subtitle phones__subtitle_little">Items on page</h1>
              <select className="phones__select" value={perPage} onChange={handleValueChange}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ul className="phones__list">
            {perPage === options[0].value
              ? proccesedProducts.map((product) => (
                <li className="phones__item" key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))
              : filteredProducts.map((product) => (
                <li className="phones__item" key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
          </ul>
          {perPage !== options[0].value && (
            <Pagination
              total={total}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
};
