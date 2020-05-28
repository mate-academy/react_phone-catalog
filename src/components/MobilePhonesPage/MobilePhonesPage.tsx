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

  useEffect(() => {
    getProducts().then(data => setPhonesOnly(data.filter((product: Slide) => product.type === 'phone')));
  }, []);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';

  const perPage = searchParams.get('perPage') || 'all';
  const page: number = Number(searchParams.get('page')) || 1;
  let start = 0;

  if (perPage !== 'all') {
    start = (page - 1) * +perPage;
  }

  const visiblePhones = useMemo(
    () => {
      const result = [...phonesOnly];
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
          result.sort((a, b) => b.price - a.price);
      }

      return result.slice(start, start + +perPage);

    },
    [sortBy, phonesOnly, perPage, page],
  );

  return (
    <>
      <div className="phones-container">
        <h1 className="phones__title">Mobile phones</h1>
        <span className="phones__sum">
          {phonesOnly.length}
          {' '}
          models
        </span>
        <div className="phones__dropdown">
          <SelectSortPhones />
          <SelectPerPage />
        </div>
      </div>

      <div className="phones-wrap">
        {visiblePhones.map(product => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="pagination">
        <Pagination lengthArrPhones={phonesOnly.length} />
      </div>
    </>
  );
};
