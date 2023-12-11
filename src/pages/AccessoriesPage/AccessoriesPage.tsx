import React, { useState, useEffect } from 'react';
import { NavLink, useOutletContext, useSearchParams } from 'react-router-dom';

import './AccessoriesPage.scss';
import { Product } from '../../types/Product';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import { NoResults } from '../../components/NoResults/NoResults';
import {
  NoSearchResults,
} from '../../components/NoSearchResults/NoSearchResults';
import { FavoritesContextType } from '../../types/FavoritesContextType';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortedAccessories, setSortedAccessories] = useState(() => {
    return [...accessories].sort((a, b) => b.year - a.year);
  });

  const [displayedAccessories, setDisplayedAccessories]
  = useState<Product[]>([]);

  const { appliedQuery }
  = useOutletContext<FavoritesContextType>();

  useEffect(() => {
    const getAccessories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/_new/products.json');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const currentAccessories
          = data.filter((product: Product) => product.category === 'accessory');

        setAccessories(currentAccessories);
      } catch (error) {
        setHasError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    getAccessories();
  }, []);

  useEffect(() => {
    setSortedAccessories([...accessories].sort((a, b) => b.year - a.year));
  }, [accessories]);

  useEffect(() => {
    let result = [...sortedAccessories];

    if (appliedQuery) {
      result = result.filter(product => {
        return product.name.toLowerCase().includes(appliedQuery.toLowerCase());
      });
    }

    setDisplayedAccessories(result);
  }, [appliedQuery, sortedAccessories]);

  const sortProducts = (sortValue: string) => {
    let sortedArray;

    switch (sortValue) {
      case 'age':
        sortedArray = [...accessories].sort((a, b) => b.year - a.year);
        break;
      case 'name':
        sortedArray
        = [...accessories].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sortedArray = [...accessories].sort((a, b) => a.price - b.price);
        break;
      default:
        sortedArray = accessories;
    }

    setSortedAccessories(sortedArray);
    const params = new URLSearchParams(searchParams);

    params.set('sort', sortValue);
    setSearchParams(params);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    sortProducts(event.target.value);
  };

  const total = displayedAccessories.length;
  const sortBy = searchParams.get('sort') || 'age';
  const perPage = +(searchParams.get('perPage') || 16);
  const currentPage = +(searchParams.get('page') || 1);
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems
  = displayedAccessories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', event.target.value);
    setSearchParams(params);
  };

  const onPageChange = (link: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', link.toString());
    setSearchParams(params);
  };

  return (
    <div className="accessoriesPage">
      <div className="pathInscription">
        <div className="nav-logo">
          <NavLink
            to="/"
          >
            <img src="_new/img/icons/home-logo.svg" alt="home-logo" />
          </NavLink>
        </div>
        <img
          src="_new/img/icons/GrayArrowRight.svg"
          alt="arrowRight"
          className="pathInscription__arrowRight"
        />
        <p className="pathInscription__text">Accessories</p>
      </div>
      <h1 className="accessoriesPage__title">Accessories</h1>
      <p className="accessoriesPage__count">{`${total} models`}</p>

      {isLoading && <Loader />}

      {hasError && (
        <p>{hasError}</p>
      )}

      {!accessories.length && !isLoading && !hasError && !appliedQuery && (
        <NoResults productName="Accessories" />
      )}

      {!displayedAccessories.length && appliedQuery
      && !isLoading && !hasError && (
        <NoSearchResults />
      )}

      {!isLoading && !hasError && !!displayedAccessories.length && (
        <>
          <div className="sorting">
            <label className="sorting__label">
              <p className="sorting__title">Sort by</p>
              <select
                onChange={handleSortChange}
                className="sorting__options"
                value={sortBy}
              >
                <option value="age" className="sorting__option">Newest</option>
                <option value="name" className="sorting__option">
                  Alphabetically
                </option>
                <option
                  value="price"
                  className="sorting__option"
                >
                  Cheapest
                </option>
              </select>
            </label>

            <div className="pagination">
              <div className="form-group">
                <label htmlFor="perPageSelector" className="col-form-label col">
                  Items on page
                </label>

                <div className="col-3 col-sm-2 col-xl-1">
                  <select
                    data-cy="perPageSelector"
                    id="perPageSelector"
                    className="form-control"
                    onChange={handlePerPageChange}
                    value={perPage}
                  >
                    <option value="4" className="form-control__option">
                      4
                    </option>
                    <option value="8" className="form-control__option">
                      8
                    </option>
                    <option value="16" className="form-control__option">
                      16
                    </option>
                    <option value={total} className="form-control__option">
                      all
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <ProductsList products={currentItems} />
          {total / perPage > 1 && (
            <Pagination
              total={total}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
