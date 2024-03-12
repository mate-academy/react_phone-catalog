/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';
import { getProducts, sortProducts } from '../helpers/ProductMethods';
import { Product } from '../types/Product';
import { ProductList } from '../components/ProductList';
import { Loader } from '../components/Loader';
import { getSearchWith } from '../helpers/searchHelper';
import { Pagination } from '../components/Pagination';
import { NoResults } from './NoResults';
import { CartItem } from '../types/CartItem';

type Props = {
  setCartItems: (item: CartItem[]) => void;
  cartItems: CartItem[];
  favourites: Product[];
  setFavourites: (products: Product[]) => void;
};

export const AccessoriesPage: React.FC<Props> = ({
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
        const filteredPhones = response.filter(
          (product: Product) => product.type === 'accessory',
        );

        sortProducts(filteredPhones, sortBy);
        setProducts(filteredPhones);
      })
      .finally(() => setIsLoading(false));
  }, [sortBy]);

  return (
    <div className="phone-page">
      {products.length > 0 && (
        <>
          <div className="page-path-icons phone-page__path">
            <NavLink className="icon icon--home" to="/" />
            <p className="icon icon--slider" />
            <p className="page-path-icons__location">Accessories</p>
          </div>

          <div className="page-title">
            <h1 className="page-title__title">Accessories</h1>
            <p className="page-title__items-count">{`${products.length} items`}</p>
            <div className="page-title__sort">
              <div className="page-title__sort-selection">
                <p className="page-title__sort-title">Sort by</p>

                <div className="dropdown dropdown--big">
                  <div onClick={toggleDropdownSorted} className="dropbtn">
                    {selectedValueSorted}
                    <div
                      className={cn(
                        'icon icon--slider icon--down dropdown__icon',
                        {
                          'icon--up': isOpenSorted,
                        },
                      )}
                    />
                  </div>
                  <div
                    id="dropdownContent"
                    className={`dropdown-content ${isOpenSorted ? 'show' : ''}`}
                  >
                    <div
                      onClick={() => handleSearch('Newest')}
                      className="option"
                    >
                      Newest
                    </div>
                    <div
                      onClick={() => handleSearch('Alphabetically')}
                      className="option"
                    >
                      Alphabetically
                    </div>
                    <div
                      onClick={() => handleSearch('Cheapest')}
                      className="option"
                    >
                      Cheapest
                    </div>
                  </div>
                </div>
              </div>

              <div className="page-title__sort-selection">
                <p className="page-title__sort-title">Items on page</p>

                <div className="dropdown">
                  <div onClick={toggleDropdown} className="dropbtn">
                    {selectedValue}
                    <div
                      className={cn(
                        'icon icon--slider icon--down dropdown__icon',
                        {
                          'icon--up': isOpen,
                        },
                      )}
                    />
                  </div>
                  <div
                    id="dropdownContent"
                    className={`dropdown-content ${isOpen ? 'show' : ''}`}
                  >
                    <div onClick={() => handlePerPage('4')} className="option">
                      4
                    </div>
                    <div onClick={() => handlePerPage('8')} className="option">
                      8
                    </div>
                    <div onClick={() => handlePerPage('16')} className="option">
                      16
                    </div>
                    <div
                      onClick={() => handlePerPage('all')}
                      className="option"
                    >
                      All
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="phone-page__content">
          <div className="phone-page__list">
            <ProductList
              setCartItems={setCartItems}
              products={products}
              cartItems={cartItems}
              favourites={favourites}
              setFavourites={setFavourites}
            />
          </div>

          {products.length > 0 ? (
            <>
              {products.length > +itemsOnPage && (
                <div className="phone-page__pagination">
                  <Pagination total={products.length} />
                </div>
              )}
            </>
          ) : (
            <div className="phone-page__no-result">
              <NoResults componentName="Accessories" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
