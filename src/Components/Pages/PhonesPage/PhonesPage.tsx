import './PhonesPage.scss';
import { useState } from 'react';
import { Header } from '../../Header';
import { PhonesPageOsm } from './PhonesPageOsm/PhonesPageOsm';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import products from '../../../new/products.json';

export const PhonesPage = () => {
  const [search, setSearch] = useState('');
  const searchQueries = search.trim().toUpperCase().split(' ');

  const visibleProducts = products.filter(product => {
    const {
      name,
      phoneId,
      itemId,
      fullPrice,
      price,
      screen,
      capacity,
      color,
      ram,
      year,
    } = product;

    const values = [
      name.toUpperCase(),
      phoneId.toUpperCase(),
      itemId.toUpperCase(),
      fullPrice.toString(),
      price.toString(),
      screen.toUpperCase(),
      capacity.toUpperCase(),
      color.toUpperCase(),
      ram.toUpperCase(),
      year.toString(),
    ];

    return searchQueries.every(
      query => values.some(value => value.includes(query)),
    );
  });

  return (
    <>
      <Header searchValue={search} setSearchValue={setSearch} />
      {visibleProducts.length > 0 ? (
        <PhonesPageOsm products={visibleProducts} />
      ) : (
        <NotFoundPage
          title="?"
          h1="Nothing found"
          text="Sorry, we did not find anything. We suggest you return to the "
        />
      )}
    </>
  );
};
