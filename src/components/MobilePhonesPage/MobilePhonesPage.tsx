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
  // const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const query = searchParams.get('query') || '';
  const perPage = searchParams.get('perPage') || 'all';
  const page: number = Number(searchParams.get('page')) || 1;
  const lowerQuery = query.toLocaleLowerCase();

  // useEffect(() => {
  //   if (query !== '') {
  //     searchParams.set('page', '1');
  //     history.push({ search: searchParams.toString() });
  //   }
  // },[query])

  // useEffect(() => {
  //   const regex = '/page=\d/g';
  //   const path = location.search.replace(regex, 'page=1');
  //   <Redirect from={location.search} to={path} />

  // }, [totalPages <= 1])
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
      <div className="phones-container">
        <h1 className="phones__title">Mobile phones</h1>
        <span className="phones__sum">
          {totalModels}
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
      {totalPages > 1
        && (
          <div className="pagination">
            <Pagination totalPages={totalPages} perPage={perPage} />
          </div>
        )}
    </>
  );
};
