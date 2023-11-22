/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import './Phones.scss';
import { Product } from '../../types/productType';
import { Pagination } from '../../components/Pagination/Pagination';
import { getNumbers } from '../../utils/getNumbers';
import { Sort } from '../../components/Sort/Sort';
import { ProductList } from '../../components/ProductList/ProductList';
import { Breadcrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { getSortedProducts } from '../../utils/filteredProducts';
import { CartItem } from '../../types/cartType';

type Props = {
  phones: Product[]
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>,
  favorites: Product[],
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
};

export const Phones: React.FC<Props> = ({
  phones,
  setFavorites,
  favorites,
  cartItems,
  setCartItems,
}) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || 16;
  const query = searchParams.get('query');
  const [isSearchInPhons, setIsSearchInPhons] = useState(location.pathname.includes('phones'));
  const page = searchParams.get('page') || '1';

  useEffect(() => {
    setIsSearchInPhons(location.pathname.includes('phones'));
  }, [location.pathname]);

  const totalItems = getSortedProducts([...phones], sort, query).length;
  const startItem = +perPage * +page - +perPage + 1;
  const endItem
    = startItem + +perPage - 1 > totalItems
      ? totalItems
      : startItem + +perPage - 1;

  const [visibleItems, setVisibleItems] = useState([...phones].slice(startItem - 1, endItem));

  useEffect(() => {
    let newVisibleItems = [...phones].slice(startItem - 1, endItem);

    if (isSearchInPhons) {
      newVisibleItems = getSortedProducts([...phones], sort, query).slice(startItem - 1, endItem);
    }

    setVisibleItems(newVisibleItems);
  }, [phones, sort, isSearchInPhons, startItem, endItem, query, page]);

  const pageCount = getNumbers(1, Math.ceil(totalItems / +perPage)).map(n => n);

  return (
    phones.length
      ? (
        <div className="phones">

          <div className="breadcrumbs-container" data-cy="breadCrumbs">
            <Breadcrumbs />
          </div>

          <div className="phones__description">
            <h1 className="phones__description-title title">
              Phones
            </h1>
            <p className="phones__description-count items-count">{`${phones.length} models`}</p>
          </div>

          <div className="sort-container">
            <Sort
              products={phones}
            />
          </div>

          {totalItems > 0
            ? (
              <div className="product-list-container" data-cy="productList">
                <ProductList
                  products={visibleItems}
                  setFavorites={setFavorites}
                  favorites={favorites}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              </div>
            )
            : <h1 className="title" style={{ marginTop: '40px' }}>There is no results for this search</h1>}
          {totalItems / +perPage > 1 && (
            <div className="pagination-container">
              <Pagination
                total={totalItems}
                perPage={+perPage}
                arrOfPages={pageCount}
              />
            </div>
          )}
        </div>
      )
      : <h1 className="title">Phones not found</h1>
  );
};
