import React, { useState, useEffect } from 'react';
import { NavLink, useOutletContext, useSearchParams } from 'react-router-dom';

import './PhonesPage.scss';
import { Product } from '../../types/Product';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import { NoResults } from '../../components/NoResults/NoResults';
import {
  NoSearchResults,
} from '../../components/NoSearchResults/NoSearchResults';
import { FavoritesContextType } from '../../types/FavoritesContextType';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortedPhones, setSortedPhones] = useState(() => {
    return [...phones].sort((a, b) => b.year - a.year);
  });

  const [displayedPhones, setDisplayedPhones] = useState<Product[]>([]);

  const { appliedQuery }
    = useOutletContext<FavoritesContextType>();

  useEffect(() => {
    const getPhones = async () => {
      setIsLoading(true);
      try {
        const response
        = await fetch(
          'https://mate-academy.github.io/react_phone-catalog/'
          + '_new/products.json',
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const currentPhones
          = data.filter((product: Product) => product.category === 'phones');

        setPhones(currentPhones);
      } catch (error) {
        setHasError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    getPhones();
  }, []);

  useEffect(() => {
    setSortedPhones([...phones].sort((a, b) => b.year - a.year));
  }, [phones]);

  useEffect(() => {
    let result = [...sortedPhones];

    if (appliedQuery) {
      result = result.filter(product => {
        return product.name.toLowerCase().includes(appliedQuery.toLowerCase());
      });
    }

    setDisplayedPhones(result);
  }, [appliedQuery, sortedPhones]);

  const sortProducts = (sortValue: string) => {
    let sortedArray;

    switch (sortValue) {
      case 'age':
        sortedArray = [...phones].sort((a, b) => b.year - a.year);
        break;
      case 'name':
        sortedArray = [...phones].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sortedArray = [...phones].sort((a, b) => a.price - b.price);
        break;
      default:
        sortedArray = phones;
    }

    setSortedPhones(sortedArray);
    const params = new URLSearchParams(searchParams);

    params.set('sort', sortValue);
    setSearchParams(params);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    sortProducts(event.target.value);
  };

  const total = displayedPhones.length;
  const sortBy = searchParams.get('sort') || 'age';
  const perPage = +(searchParams.get('perPage') || 16);
  const currentPage = +(searchParams.get('page') || 1);
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = displayedPhones.slice(indexOfFirstItem, indexOfLastItem);

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
    <div className="phonesPage">
      <div className="pathInscription">
        <div className="nav-logo">
          <NavLink
            to="/"
          >
            <img src="/img/icons/home-logo.svg" alt="home-logo" />
          </NavLink>
        </div>
        <img
          src="/img/icons/GrayArrowRight.svg"
          alt="arrowRight"
          className="pathInscription__arrowRight"
        />
        <p className="pathInscription__text">Phones</p>
      </div>
      <h1 className="phonesPage__title">Mobile phones</h1>
      <p className="phonesPage__count">95 models</p>

      {isLoading && <Loader />}

      {hasError && (
        <p>{hasError}</p>
      )}

      {!phones.length && !isLoading && !hasError && !appliedQuery && (
        <NoResults productName="Phones" />
      )}

      {!displayedPhones.length && appliedQuery && !isLoading && !hasError && (
        <NoSearchResults />
      )}

      {!isLoading && !hasError && !!displayedPhones.length && (
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
