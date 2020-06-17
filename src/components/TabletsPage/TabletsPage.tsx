import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { getProducts } from '../../helpers/api';
import { sortGoods } from '../../helpers/sortGoods';
import { visibleGoodsOnPage } from '../../helpers/visibleGoods';

import { Card } from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import './TabletsPage.scss';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import Loading from '../Loading/Loading';
import SelectSortPhones from '../SelectSortPhones/SelectSortPhones';
import SelectPerPage from '../SelectPerPage/SelectPerPage';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
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
  const [filteredTablets, setFilteredTablets] = useState<Product[]>([]);
  let totalPages = 0;

  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      try {
        const loadedProduct = await getProducts();

        setTablets(loadedProduct
          .filter((product: Product) => product.type === 'tablet'));
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
    setFilteredTablets(
      tablets.filter(({ name, capacity, screen }) => (
        (name + capacity + screen).toLowerCase().includes(lowerQuery)
      )),
    );
  }, [tablets, query, lowerQuery]);

  const visibleTablets = useMemo(() => {
    sortGoods(filteredTablets, sortBy);

    return visibleGoodsOnPage(filteredTablets, perPage, page);
  },
  [filteredTablets, sortBy, perPage, page]);

  if (perPage !== 'all') {
    totalPages = Math.ceil(filteredTablets.length / +perPage);
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
        <div className="TabletContainer">
          <Breadcrumbs />
          <h1 className="Tablet__Title">Tablets</h1>
          <span className="Tablet__Sum">
            {filteredTablets.length}
            {' '}
            models
          </span>
          <div className="Phones__Dropdown">
            <SelectSortPhones />
            <SelectPerPage />
          </div>
          <div className="TabletWrap">
            {visibleTablets.map(product => (
              <Card key={product.id} product={product} />
            ))}
          </div>
          {totalPages > 1
            && (
              <div className="Pagination">
                <Pagination totalPages={totalPages} />
              </div>
            )}
        </div>
      )}
    </>
  );
};
