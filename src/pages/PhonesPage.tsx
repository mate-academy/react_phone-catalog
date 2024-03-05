import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';
import { Dropdowns } from '../components/Dropdowns';
import { ProductsList } from '../components/ProductsList';
import { Pagination } from '../components/Pagination';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { SortValue } from '../types/SortValue';

import '../styles/PhonesPage.scss';

export const PhonesPage: React.FC = () => {
  const { phones } = useContext(GlobalContext);

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = +(searchParams.get('perPage') || 'All');
  const page = +(searchParams.get('page') || 1);

  const maxItem = page * perPage;
  const firstItem = maxItem - perPage;
  const lastItem = maxItem > phones.length ? phones.length : maxItem;

  const sortedPhones = [...phones].sort((a, b) => {
    switch (sort) {
      case SortValue.age:
        return b.price - a.price;

      case SortValue.price:
        return a.price - b.price;

      case SortValue.name:
        return a.name.localeCompare(b.name);

      default:
        return 0;
    }
  });

  const finalPhones = sortedPhones.slice(firstItem, lastItem);

  // console.log(phones);

  return (
    <main className="phones-page">
      <BreadCrumbs category="Phones" />

      <h2 className="phones-page__title">
        Mobile phones
      </h2>

      <p className="phones-page__count">
        {`${phones.length} ${phones.length === 1 ? 'model' : 'models'}`}
      </p>

      <Dropdowns />

      {Number.isNaN(perPage) ? (
        <ProductsList products={sortedPhones} />
      ) : (
        <>
          <ProductsList products={finalPhones} />
          <Pagination productsCount={phones.length} />
        </>
      )}
    </main>
  );
};
