/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import {
  getProducts,
  getSortedQuery,
  sortProducts,
} from '../helpers/ProductMethods';
import { Product } from '../types/Product';
import { ProductList } from '../components/ProductList';
import { Loader } from '../components/Loader';
import { getSearchWith } from '../helpers/searchHelper';
import { Pagination } from '../components/Pagination';
import { NoResults } from './NoResults';
import { CartItem } from '../types/CartItem';
import { Dropdown } from '../components/Dropdown';

type Props = {
  setCartItems: (item: CartItem[]) => void;
  cartItems: CartItem[];
  favourites: Product[];
  setFavourites: (products: Product[]) => void;
};

export const TabletPage: React.FC<Props> = ({
  setCartItems,
  cartItems,
  favourites,
  setFavourites,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'Newest';
  const itemsOnPage = searchParams.get('perPage') || '4';
  const query = searchParams.get('query') || '';
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(itemsOnPage);
  const [isOpenSorted, setIsOpenSorted] = useState(false);
  const [selectedValueSorted, setSelectedValueSorted] = useState(sortBy);

  const handleSearch = (value: string) => {
    setSelectedValueSorted(value);
    setIsOpenSorted(false);
    setSearchParams(getSearchWith(searchParams, { sort: value || null }));
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdownSorted = () => {
    setIsOpenSorted(!isOpenSorted);
  };

  const handlePerPage = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    setSearchParams(
      getSearchWith(searchParams, {
        page: '1',
        perPage: value,
      }),
    );
  };

  useEffect(() => {
    setIsLoading(true);
    getProducts('/products.json')
      .then((response) => {
        const filteredTablets = response.filter(
          (product: Product) => product.type === 'tablet',
        );
        const sortedTablets = getSortedQuery(filteredTablets, query);

        sortProducts(sortedTablets, sortBy);
        setProducts(sortedTablets);
      })
      .finally(() => setIsLoading(false));
  }, [sortBy, query]);

  return (
    <div className="phone-page">
      <div className="page-path-icons phone-page__path">
        <NavLink to="/" className="icon icon--home" />
        <p className="icon icon--slider" />
        <p className="page-path-icons__location">Tablets</p>
      </div>

      <div className="page-title">
        <h1 className="page-title__title">Tablets</h1>
        <p className="page-title__items-count">{`${products.length} items`}</p>
        <div className="page-title__sort">
          <div className="page-title__sort-selection">
            <p className="page-title__sort-title">Sort by</p>
            <Dropdown
              toggleDropdown={toggleDropdownSorted}
              selectedValue={selectedValueSorted}
              handleOptionClick={handleSearch}
              options={['Newest', 'Alphabetically', 'Cheapest']}
              isOpen={isOpenSorted}
            />
          </div>

          <div className="page-title__sort-selection">
            <p className="page-title__sort-title">Items on page</p>
            <Dropdown
              toggleDropdown={toggleDropdown}
              selectedValue={selectedValue}
              handleOptionClick={handlePerPage}
              options={['4', '8', '16', 'all']}
              isOpen={isOpen}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="phone-page__content">
          {products.length > 0 ? (
            <>
              <div className="phone-page__list">
                <ProductList
                  products={products}
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                  favourites={favourites}
                  setFavourites={setFavourites}
                />
              </div>

              {products.length > +itemsOnPage && (
                <div className="phone-page__pagination">
                  <Pagination total={products.length} />
                </div>
              )}
            </>
          ) : (
            <div className="phone-page__no-result">
              <NoResults componentName="Tablets" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
