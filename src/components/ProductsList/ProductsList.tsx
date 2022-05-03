import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Pagination } from '../Pagination';
import { Loader } from '../Loader';
import { getGoods, getLoadingStatus } from '../../store';
import { ProductCard } from '../ProductCard';
import { NoResults } from '../NoResults';
import { Breadcrumbs } from '../Breadcrumbs';
import { NoSelected } from '../NoSelected';
import './ProductsList.scss';

export const ProductsList = () => {
  const products = useSelector(getGoods);
  const loading = useSelector(getLoadingStatus);
  const { search, pathname } = useLocation();
  const productType = pathname.slice(1, pathname.length - 1);
  const searchParams = new URLSearchParams(search);
  const history = useHistory();
  const sortBy = searchParams.get('sortBy') || 'age';
  const itemsOnPage = searchParams.get('itemsOnPage') || 'all';
  const currentPage = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';
  const header = pathname === '/phones'
    ? 'Mobile phones'
    : pathname[1].toUpperCase() + pathname.slice(2, pathname.length);

  const onSortChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('page', '1');
    searchParams.set(target.name, target.value);

    if (searchParams.get('itemsOnPage') === 'all'
    || Number(searchParams.get('itemsOnPage')) >= products.length) {
      searchParams.delete('page');
    }

    history.push(`?${searchParams.toString()}`);
  };

  const getProductsByType = useMemo(() => (
    products.filter(product => product.type === productType)
  ), [productType, products]);

  const getSortedAndFilteredProducts = useMemo(() => {
    let sortedProducts;

    switch (sortBy) {
      case 'age':
        sortedProducts = getProductsByType
          .sort((phoneA, phoneB) => phoneA.age - phoneB.age);
        break;

      case 'name':
        sortedProducts = getProductsByType
          .sort((phoneA, phoneB) => phoneA.name.localeCompare(phoneB.name));
        break;

      default:
        sortedProducts = getProductsByType
          .sort((phoneA, phoneB) => phoneA.price - phoneB.price);
    }

    const filteredProducts = sortedProducts
      .filter(product => product.name.toLowerCase().includes(query));

    return filteredProducts;
  }, [getProductsByType, query, sortBy]);

  const getVisibleProducts = () => {
    if (itemsOnPage === 'all') {
      return getSortedAndFilteredProducts;
    }

    const firstIndexOfVisibleProducts = Number(currentPage) * Number(itemsOnPage)
     - Number(itemsOnPage);
    const lastIndexOfVisibleProducts = Number(currentPage) * Number(itemsOnPage);
    const visibleProducts = getSortedAndFilteredProducts
      .slice(firstIndexOfVisibleProducts, lastIndexOfVisibleProducts);

    return visibleProducts;
  };

  const onNextPage = () => {
    const newPage = Number(currentPage) + 1;

    searchParams.set('page', newPage.toString());
    history.push(`?${searchParams.toString()}`);
  };

  const onPreviousPage = () => {
    const newPage = Number(currentPage) - 1;

    searchParams.set('page', newPage.toString());
    history.push(`?${searchParams.toString()}`);
  };

  const onCertainPage = (page: number) => {
    searchParams.set('page', page.toString());
    history.push(`?${searchParams.toString()}`);
  };

  if (!getProductsByType.length && !loading) {
    return <NoResults />;
  }

  return (
    <div className="ProductList">
      <Breadcrumbs />

      <div className="ProductList-TitleRow">
        <h1 className="ProductList-Title">{header}</h1>
        <span className="ProductList-Quantity">
          {`${getProductsByType.length} models`}
        </span>
      </div>

      {loading
        ? (
          <Loader />
        )
        : (
          <>
            <div className="Actions ProductList-Actions">
              <div className="Actions-Block">
                <span className="Actions-Name">Sort by</span>
                <select
                  value={sortBy}
                  name="sortBy"
                  className="Actions-Select"
                  onChange={onSortChange}
                >
                  <option value="age">Newest</option>
                  <option value="name">Alphabetically</option>
                  <option value="price">Cheapest</option>
                </select>
              </div>
              <div className="Actions-Block">
                <span className="Actions-Name">Items on page</span>
                <select
                  value={itemsOnPage}
                  name="itemsOnPage"
                  className="Actions-Select"
                  onChange={onSortChange}
                >
                  <option value="all">all</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                </select>
              </div>
            </div>

            <div className="ProductList-List" data-cy="productList">
              {getVisibleProducts().map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {itemsOnPage !== 'all'
              ? (
                <Pagination
                  itemsOnPage={itemsOnPage}
                  currentPage={currentPage}
                  onNextPage={onNextPage}
                  onPreviousPage={onPreviousPage}
                  products={getSortedAndFilteredProducts}
                  onCertainPage={onCertainPage}
                />
              )
              : (
                !getSortedAndFilteredProducts.length && (
                  <NoSelected />
                )
              )}

          </>
        )}

    </div>
  );
};
