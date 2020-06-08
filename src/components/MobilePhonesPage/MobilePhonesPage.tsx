import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../../helpers/api';
import { Card } from '../Card/Card';
import './MobilePhonesPage.scss';
import SelectSortPhones from '../SelectSortPhones/SelectSortPhones';
import SelectPerPage from '../SelectPerPage/SelectPerPage';
import Pagination from '../Pagination/Pagination';

export const MobilePhonesPage: React.FC = () => {
  const [phonesOnly, setPhonesOnly] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const loadedProduct = await getProducts();

        setPhonesOnly(loadedProduct.filter((product: Slide) => product.type === 'phone'));
        setIsLoaded(true);
      } catch (error) {
        setErrorMessage(String(error));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const query = searchParams.get('query') || '';
  const perPage = searchParams.get('perPage') || 'all';
  const page: number = Number(searchParams.get('page')) || 1;
  const lowerQuery = query.toLocaleLowerCase();

  let totalModels = phonesOnly.length;
  let totalPages = 0;

  const visiblePhones = useMemo(
    () => {
      const result = phonesOnly.filter(({ name, capacity, screen }) => (
        (name + capacity + screen).toLowerCase().includes(lowerQuery)
      ));

      totalModels = result.length;
      switch (sortBy) {
        case 'name':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;

        case 'price':
          result.sort((a, b) => a.price - b.price);
          break;

        case 'age':
          result.sort((a, b) => a.age - b.age);
          break;
        default:
          result.sort((a, b) => a.age - b.age);
      }

      if (perPage !== 'all') {
        const start = (page - 1) * +perPage;

        return result.slice(start, start + +perPage);
      }

      return result;
    },
    [sortBy, phonesOnly, perPage, page, query],
  );

  if (perPage !== 'all') {
    totalPages = Math.ceil(totalModels / +perPage);
  }

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      {isLoading
        && (
          <div className="Loading">
            Loading...
          </div>
        )}
      {isLoading && isLoaded && ''}
      <div className="PhonesContainer">
        <h1 className="Phones__Title">Mobile phones</h1>
        <span className="Phones__Sum">
          {totalModels}
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
          <Card key={product.id} {...product} />
        ))}
      </div>
      {totalPages > 1
        && (
          <div className="Pagination">
            <Pagination totalPages={totalPages} />
          </div>
        )}
    </>
  );
};
