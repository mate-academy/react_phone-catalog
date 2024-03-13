import React, { useCallback, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';
import { Dropdowns } from '../components/Dropdowns';
import { ProductsList } from '../components/ProductsList';
import { Pagination } from '../components/Pagination';
import { BreadCrumbs } from '../components/BreadCrumbs';
// import { SortValue } from '../types/SortValue';
import { Categories } from '../types/Categories';

import '../styles/PhonesPage.scss';
import { WarningMessage } from '../types/WarningMessage';
import { prepareProductList } from '../helpers/prepareProductList';

export const PhonesPage: React.FC = () => {
  const { phones } = useContext(GlobalContext);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || 'age';
  const perPage = +(searchParams.get('perPage') || 'All');
  const page = +(searchParams.get('page') || 1);

  const maxItem = page * perPage;
  const firstItem = maxItem - perPage;
  const lastItem = maxItem > phones.length ? phones.length : maxItem;

  const getVisiblePhones = useCallback(() => (
    prepareProductList(phones, query, sort)
  ), [phones, query, sort]);

  const visiblePhones = getVisiblePhones();
  const onPagePhones = visiblePhones.slice(firstItem, lastItem);

  if (query && !visiblePhones.length) {
    return (
      <main className="phones-page">
        <BreadCrumbs category={Categories.Phones} />

        <h1 className="warning">{WarningMessage.Search}</h1>
      </main>
    );
  }

  return (
    <main className="phones-page">
      <BreadCrumbs category={Categories.Phones} />

      <h2 className="phones-page__title">
        Mobile phones
      </h2>

      <p className="phones-page__count">
        {`${visiblePhones.length} ${visiblePhones.length === 1 ? 'model' : 'models'}`}
      </p>

      <Dropdowns />

      {Number.isNaN(perPage) ? (
        <ProductsList products={visiblePhones} />
      ) : (
        <>
          <ProductsList products={onPagePhones} />
          <Pagination productsCount={visiblePhones.length} />
        </>
      )}
    </main>
  );
};
