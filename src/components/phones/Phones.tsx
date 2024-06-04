import { useContext, useMemo, useState } from 'react';
import { ContextApp } from '../../appContext/AppContext';

import style from './Phones.module.scss';
import { Pagination } from '../../pagination';
import { PhoneCard } from './productCard';
import { Phone } from '../types/Phone';
import { Product } from '../types/Product';

const SORT_BY = {
  Newest: 'newest',
  Alphabetical: 'alphabetical',
  Cheapest: 'cheapest',
} as const;

type SortBy = (typeof SORT_BY)[keyof typeof SORT_BY];

function sortBy(products: Product[], phones: Phone[], sortBy: SortBy): Phone[] {
  let copyPhones: Phone[] = [];

  if (sortBy === 'newest') {
    products
      .sort((a, b) => b.year - a.year)
      .forEach(product => {
        const match = phones.find(phone => phone.id === product.itemId);

        if (match) {
          return copyPhones.push(match);
        }

        return;
      });
  }

  if (sortBy === 'alphabetical') {
    products
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(product => {
        const match = phones.find(phone => phone.id === product.itemId);

        if (match) {
          return copyPhones.push(match);
        }

        return;
      });
  }

  if (sortBy === 'cheapest')
    products
      .sort((a, b) => a.price - b.price)
      .forEach(product => {
        const match = phones.find(phone => phone.id === product.itemId);

        if (match) {
          return copyPhones.push(match);
        }

        return;
      });

  return copyPhones;
}

export const Phones: React.FC = () => {
  const { phonesTotalNumber, products, phones } = useContext(ContextApp);
  const [selectedOption, setSelectedOption] = useState<SortBy>('newest');
  const [itemsPerPage, setItemsPerPage] = useState('16');
  const [activePage, setActivePage] = useState(1);

  const sortedPhones = sortBy(products, phones, selectedOption);

  // const sortedPhones = useMemo(() => {
  //   return sortBy(products, phones, selectedOption);
  // }, [selectedOption, phones, products]);

  const pagesTotalNumber = useMemo(() => {
    if (itemsPerPage === 'all') {
      return 1;
    }
    return Math.ceil(phonesTotalNumber / +itemsPerPage);
  }, [phonesTotalNumber, itemsPerPage]);

  const startFromElement = +itemsPerPage * activePage - +itemsPerPage;
  const endOnElement = Math.min(+itemsPerPage * activePage, phonesTotalNumber);

  const phonesOnPage =
    itemsPerPage === 'all'
      ? sortedPhones
      : sortedPhones.slice(startFromElement, endOnElement);

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value as SortBy);
  };

  const handleChangeItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(e.target.value);
    setActivePage(1);
  };

  const handlePageChange = (number: number) => {
    setActivePage(number);
  };

  return (
    <div className={style['phones']}>
      <div className={style['phones__head']}>
        <h1 className={style['phones__head__title']}>Mobile phones</h1>
        <p className={style['phones__head__paragraph']}>
          {phonesTotalNumber} models
        </p>
      </div>

      <div className={style['phones__filters']}>
        <div className={style['phones__filters__sort']}>
          <p className={style['phones__filters__sort__paragraph']}>Sort by</p>

          <select
            className={style['phones__filters__sort__select']}
            value={selectedOption}
            onChange={handleChangeSort}
          >
            <option value="newest">Newest</option>
            <option value="alphabetical">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>

        <div className={style['phones__filters__items']}>
          <p className={style['phones__filters__items__paragraph']}>
            Items on page
          </p>

          <select
            className={style['phones__filters__items__select']}
            value={itemsPerPage}
            onChange={handleChangeItems}
          >
            <option value="all">All</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </div>
      </div>

      <div className={style['phones__container']}>
        {phonesOnPage.map(phone => {
          return <PhoneCard key={phone.id} product={phone} />;
        })}
      </div>

      <div className={style['phones__choose_page']}>
        <Pagination
          pagesTotalNumber={pagesTotalNumber}
          activePage={activePage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
