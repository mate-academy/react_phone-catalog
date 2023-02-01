import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../Breadcrumbs';
import { NoResults } from '../NoResults';
import { ProductsList } from '../ProductsList';
import { Select } from '../Select';
import './ProductPage.scss';

type Props = {
  title: string,
  products: Product[],
};

export const ProductPage: React.FC<Props> = ({
  title,
  products,
}) => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);

  const { pathname } = useLocation();

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const [
    itemsOnPage,
    setItemsOnPage,
  ] = useState(
    searchParams.get('perPage') || 'All',
  );

  const [
    sortBy,
    setSortBy,
  ] = useState(
    searchParams.get('sortBy') || 'Newest',
  );

  const currentPage = searchParams.get('page') || '1';

  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(products.length);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  useEffect(() => {
    if (sortBy === 'Newest') {
      searchParams.delete('sortBy');
    } else {
      searchParams.set('sortBy', sortBy);
    }

    if (itemsOnPage === 'All') {
      searchParams.delete('perPage');
    } else {
      searchParams.set('perPage', itemsOnPage);
    }

    setSortBy(sortBy);
    setItemsOnPage(itemsOnPage);

    if (currentPage === '1') {
      searchParams.delete('page');
    } else {
      searchParams.set('page', currentPage);
    }

    if (itemsOnPage !== 'All') {
      setStart((+currentPage * +itemsOnPage) - +itemsOnPage);
      setEnd(+currentPage * +itemsOnPage);
    }

    setSearchParams(searchParams);
  }, [sortBy, itemsOnPage, currentPage]);

  useEffect(() => {
    searchParams.delete('page');
    setSearchParams(searchParams);

    if (itemsOnPage === 'All') {
      setStart(0);
      setEnd(products.length);
    }
  }, [itemsOnPage]);

  useEffect(() => {
    switch (sortBy) {
      case 'Oldest':
        return setSortedProducts(prev => prev.sort(
          (p1, p2) => p2.age - p1.age,
        ));

      case 'Alphabetically':
        return setSortedProducts(prev => prev.sort(
          (p1, p2) => p1.name.localeCompare(p2.name),
        ));

      case 'Cheapest':
        return setSortedProducts(prev => prev.sort(
          (p1, p2) => p1.price - p2.price,
        ));

      default:
        return setSortedProducts(
          prev => prev.sort(
            (p1, p2) => p1.age - p2.age,
          ),
        );
    }
  }, [sortBy]);

  const filters = {
    'Sort by': ['Newest', 'Oldest', 'Alphabetically', 'Cheapest'],
    'Items on page': ['4', '8', '16', 'All'],
  };

  if (products.length === 0) {
    return (<NoResults />);
  }

  const visibleItems = sortedProducts.slice(start, end);

  const query = searchParams.get('query');

  if (query) {
    const searchResults = products.filter(
      product => product.name.toLowerCase()
        .includes(query.toLowerCase()),
    );

    if (searchResults.length === 0) {
      return (
        <h1>No search results</h1>
      );
    }

    return (
      <>
        <p className="page__search-results medium-text">
          {`${searchResults.length} results`}
        </p>

        <ProductsList
          totalProducts={searchResults.length}
          products={searchResults}
        />
      </>
    );
  }

  return (
    <>
      <div className="page__breadcrumbs">
        <Breadcrumbs />
      </div>
      <h1 className="product-page__title page__title">
        {title}
      </h1>

      <div className="product-page__models-count">
        {`${products.length} models`}
      </div>

      {pathname !== '/favorites' && (
        <div className="product-page__filters">
          <Select
            filterTitle={Object.entries(filters)[0][0]}
            filterOptions={Object.entries(filters)[0][1]}
            currentOption={sortBy}
            onSelect={setSortBy}
          />
          <Select
            filterTitle={Object.entries(filters)[1][0]}
            filterOptions={Object.entries(filters)[1][1]}
            currentOption={itemsOnPage}
            onSelect={setItemsOnPage}
          />
        </div>
      )}

      <div className="product-page__products-list">
        <ProductsList
          totalProducts={products.length}
          products={visibleItems}
        />
      </div>
    </>
  );
};
