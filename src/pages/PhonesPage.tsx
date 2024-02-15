import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PathLink } from '../components/PathLink';
import { GlobalContext } from '../GlobalContext';
import { Dropdowns } from '../components/Dropdowns';
import { ProductsList } from '../components/ProductsList';

import '../styles/PhonesPage.scss';
import { Pagination } from '../components/Pagination';

enum SortValue {
  age = 'age',
  name = 'name',
  price = 'price',
}

export const PhonesPage: React.FC = () => {
  const { phones } = useContext(GlobalContext);

  const [searchParams] = useSearchParams();
  // const [currentPage, setCurrentPage] = useState(1);

  const sort = searchParams.get('sort') || '';
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

  // console.log(perPage);

  return (
    <main className="PhonesPage">
      <PathLink />

      <h2 className="PhonesPage__title">
        Mobile phones
      </h2>

      <p className="PhonesPage__count">
        {`${phones.length} models`}
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
