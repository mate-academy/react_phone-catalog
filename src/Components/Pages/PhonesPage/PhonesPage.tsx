import './PhonesPage.scss';
import { useState } from 'react';
import { Header } from '../../Header/Header';
import { PhonesPageOsm } from './PhonesPageOsm/PhonesPageOsm';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import products from '../../../_new/products.json';

export const PhonesPage = () => {
  const [search, setSearch] = useState('');
  const searchQuery = search.trim().toUpperCase();
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

    return [
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
    ].some(value => value.includes(searchQuery));
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
          text="sorry, we did not find anything, we suggest you return to the "
        />
      )}
    </>
  );
};
