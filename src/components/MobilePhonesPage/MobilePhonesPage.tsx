import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { getProducts } from '../../helpers/api';
import { sortGoods } from '../../helpers/sortGoods';
import { visibleGoodsOnPage } from '../../helpers/visibleGoods';

import { Card } from '../Card/Card';
import './MobilePhonesPage.scss';
import SelectSortPhones from '../SelectSortPhones/SelectSortPhones';
import SelectPerPage from '../SelectPerPage/SelectPerPage';
import Pagination from '../Pagination/Pagination';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import Loading from '../Loading/Loading';

export const MobilePhonesPage: React.FC = () => {
  const [phonesOnly, setPhonesOnly] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const query = searchParams.get('query') || '';
  const perPage = searchParams.get('perPage') || 'all';
  const page: number = Number(searchParams.get('page')) || 1;
  const lowerQuery = query.toLocaleLowerCase();
  const [filteredPhones, setFilteredPhones] = useState<Product[]>([]);

  let totalPages = 0;

  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      try {
        const loadedProduct = await getProducts();

        setPhonesOnly(loadedProduct
          .filter((product: Product) => product.type === 'phone'));
        setIsLoaded(true);
      } catch (error) {
        setErrorMessage('Oops! Reload page, please');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    setFilteredPhones(
      phonesOnly.filter(({ name, capacity, screen }) => (
        (name + capacity + screen).toLowerCase().includes(lowerQuery)
      )),
    );
  }, [phonesOnly, query, lowerQuery]);

  const visiblePhones = useMemo(() => {
    sortGoods(filteredPhones, sortBy);

    return visibleGoodsOnPage(filteredPhones, perPage, page);
  },
  [filteredPhones, sortBy, perPage, page]);

  if (perPage !== 'all') {
    totalPages = Math.ceil(filteredPhones.length / +perPage);
  }

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      {isLoading
        && (
          <div className="Loading">
            <Loading
              isLoaded={isLoaded}
              errorMessage={errorMessage}
            />
          </div>
        )}
      {isLoaded && (
        <>
          <div className="Phones PhonesContainer">
            <Breadcrumbs />
            <h1 className="Phones__Title">Mobile phones</h1>
            <span className="Phones__Sum">
              {filteredPhones.length}
              {' '}
              models
            </span>
            <div className="Phones__Dropdown">
              <SelectSortPhones />
              <SelectPerPage />
            </div>
          </div>
          <div className="PhonesContainer__Inner">
            {visiblePhones.map(product => (
              <Card key={product.id} product={product} />
            ))}
          </div>
          {totalPages > 1
            && (
              <div className="Pagination">
                <Pagination totalPages={totalPages} />
              </div>
            )}
        </>
      )}
    </>
  );
};
