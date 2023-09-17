/* eslint-disable max-len */
import {
  useContext, useState, useEffect,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { AppContext } from '../components/AppContex';
import { SortBy } from '../types/SortBy';
import { ItemsOnPage } from '../types/ItemsOnPage';
import { Pagination } from '../components/Pagination/Pagination';
import { getSearchWith } from '../utils/searchHelper';
import { Product } from '../types/product';
import { Dropdown } from '../components/Dropdown/Dropdown';

import '../styles/PhonesPage.scss';
import { PhoneNotFoundPage } from './PhoneNotFoundPage';

export const PhonesPage = () => {
  const { products } = useContext(AppContext);

  const [phones, setPhones] = useState<Product[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query');

  const currentPage = +(searchParams.get('page') || 1);
  const itemsOnPage = +(searchParams.get('perPage') || ItemsOnPage.Sixteen);
  const sortBy = searchParams.get('sort') || SortBy.New;

  useEffect(() => {
    setSearchParams(getSearchWith(searchParams, { page: '1' }));
  }, [itemsOnPage]);

  const sortPhones = ((prod: Product[], sort: string) => {
    const newSortPhones = [...prod];

    if (sort) {
      newSortPhones.sort((a, b) => {
        switch (sort) {
          case SortBy.New:
            return +b.year - +a.year;
          case SortBy.Price:
            return +b.price - +a.price;
          case SortBy.Name:
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    if (query) {
      return newSortPhones.filter(phone => (
        phone.name.toLowerCase().includes(query.toLowerCase())
      ));
    }

    return newSortPhones;
  });

  useEffect(() => {
    setPhones(sortPhones(products, sortBy));
  }, [sortBy, products, query]);

  const maxItems = phones.length;
  const firstItem = currentPage * +itemsOnPage - +itemsOnPage;
  const lastItem = currentPage * +itemsOnPage > maxItems
    ? maxItems
    : currentPage * +itemsOnPage;

  const pageItems = phones.slice(firstItem, lastItem);

  const itemsOnPageArray: string[] = Object.values(ItemsOnPage);
  const sortByArray: string[] = Object.values(SortBy);

  return (
    <div className="phones__container">
      <div className="phones__way">
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.59075 0.807088C7.83149 0.619846 8.16859 0.619846 8.40933 0.807088L14.4093 5.47375C14.5717 5.60006 14.6667 5.79426 14.6667 5.99999V13.3333C14.6667 13.8638 14.456 14.3725 14.0809 14.7475C13.7058 15.1226 13.1971 15.3333 12.6667 15.3333H3.33337C2.80294 15.3333 2.29423 15.1226 1.91916 14.7475C1.54409 14.3725 1.33337 13.8638 1.33337 13.3333V5.99999C1.33337 5.79426 1.42836 5.60006 1.59075 5.47375L7.59075 0.807088ZM2.66671 6.32605V13.3333C2.66671 13.5101 2.73695 13.6797 2.86197 13.8047C2.98699 13.9298 3.15656 14 3.33337 14H12.6667C12.8435 14 13.0131 13.9298 13.1381 13.8047C13.2631 13.6797 13.3334 13.5101 13.3334 13.3333V6.32605L8.00004 2.1779L2.66671 6.32605Z" fill="#313237" />
            <path fillRule="evenodd" clipRule="evenodd" d="M5.33337 8.00001C5.33337 7.63182 5.63185 7.33334 6.00004 7.33334H10C10.3682 7.33334 10.6667 7.63182 10.6667 8.00001V14.6667C10.6667 15.0349 10.3682 15.3333 10 15.3333C9.63185 15.3333 9.33337 15.0349 9.33337 14.6667V8.66668H6.66671V14.6667C6.66671 15.0349 6.36823 15.3333 6.00004 15.3333C5.63185 15.3333 5.33337 15.0349 5.33337 14.6667V8.00001Z" fill="#313237" />
          </svg>
        </Link>

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.52864 3.52861C5.78899 3.26826 6.2111 3.26826 6.47145 3.52861L10.4714 7.52861C10.7318 7.78896 10.7318 8.21107 10.4714 8.47141L6.47145 12.4714C6.2111 12.7318 5.78899 12.7318 5.52864 12.4714C5.26829 12.2111 5.26829 11.789 5.52864 11.5286L9.05723 8.00001L5.52864 4.47141C5.26829 4.21107 5.26829 3.78896 5.52864 3.52861Z" fill="#B4BDC4" />
        </svg>

        <span>Phones</span>
      </div>

      {pageItems.length > 0 && (
        <>
          <h1 className="phones-title">Mobile phones</h1>

          <span className="phones__m-b">{`${phones.length} models`}</span>

          <section className="phones__selects">
            <Dropdown
              title="Sort by"
              arrayValues={sortByArray}
              phones={phones}
              selectValue={sortBy}
              param="sort"
            />

            <Dropdown
              title="Items on page"
              arrayValues={itemsOnPageArray}
              phones={phones}
              selectValue={itemsOnPage}
              param="perPage"
            />
          </section>

          <section className="phones-card__container" data-cy="cardsContainer">
            {pageItems.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                firstPhone={0}
              />
            ))}
          </section>

          {itemsOnPage !== phones.length && (
            <Pagination
              total={maxItems}
              perPage={+itemsOnPage}
              currentPage={currentPage}
              setSearchParams={setSearchParams}
              searchParams={searchParams}
            />
          )}

        </>
      )}

      {pageItems.length < 1 && (
        <PhoneNotFoundPage />
      )}
    </div>
  );
};
