import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../helpers/page.scss';
import { ProductsList } from '../components/ProductsList';
import { Product } from '../types/Product';
import { PagesLinks } from '../components/PagesLinks';
import { Paginations } from '../components/Paginations';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type Props = {
  phones: Product[];
  // addProductToCart: (product: Product) => void,
  // addProductToFavourites: (product: Product) => void,
};

export const PhonesPage: React.FC<Props> = ({
  phones,
  // addProductToCart,
  // addProductToFavourites,
}) => {
  const [sortOption, setSortOption] = useState('');
  const [query, setQuery] = useState('');
  const total = phones.length;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const perPageSearch = searchParams.get('perPage') || '4';

  function getSearchWith(params: { [key: string]: string }): string {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);

        value.forEach(part => {
          searchParams.append(key, part);
        });
      } else {
        searchParams.set(key, value);
      }
    });

    return searchParams.toString();
  }

  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(
      getSearchWith({ perPage: event.target.value || `${total}` }),
    );

    setSearchParams(
      getSearchWith({ page: '1' }),
    );
  };

  const onChangePage = (currentPage: number) => {
    setSearchParams(
      getSearchWith({ page: `${currentPage}` }),
    );
  };

  const onSelectSortOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const phonePrice = (phone: Product) => {
    if (phone.discount > 0) {
      return (phone.price - (phone.price * phone.discount) / 100);
    }

    return phone.price;
  };

  const filteredProducts = query
    ? phones.filter(phone => {
      return phone.name.toLowerCase().includes(query.toLowerCase().trim());
    })
    : [...phones];

  const getSortedPhones = () => {
    const sortedPhones = [...filteredProducts].sort((phone1, phone2) => {
      switch (sortOption) {
        case 'name':
          return phone1.name.localeCompare(phone2.name);

        case 'age':
          return phone1.age - phone2.age;

        case 'price':
          return phonePrice(phone1) - phonePrice(phone2);

        default:
          return 0;
      }
    });

    return sortedPhones;
  };

  const sortedPhones = useMemo(
    getSortedPhones,
    [phones, sortOption, filteredProducts],
  );

  const lastItem = +page * +perPageSearch;
  const firstItem = lastItem - +perPageSearch;

  const currentItems = sortedPhones.slice(firstItem, lastItem);

  return (
    <div className="page">
      <Header search="phones" setQuery={setQuery} />

      <div className="page__content">
        <div className="page__links-wrapper">
          <PagesLinks />
        </div>

        <h1 className="page__title">Mobile phones</h1>

        <h2 className="page__subtitle">
          {`${phones.length} models`}
        </h2>

        {phones.length > 0 && (
          <form className="form">
            <label className="form__label">
              <p className="form__text">Sort by</p>
              <select
                value={sortOption}
                onChange={onSelectSortOption}
              >
                <option value="age">Newest</option>
                <option value="name">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
            </label>

            <label className="form__label">
              <p className="form__text">Items on page</p>
              <select
                value={perPageSearch}
                onChange={onSelect}
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="all">all</option>
              </select>
            </label>
          </form>
        )}

        <ProductsList
          phones={currentItems}
          // addProductToCart={addProductToCart}
          // addProductToFavourites={addProductToFavourites}
        />

        {total > +perPageSearch && (
          <Paginations
            total={total}
            perPage={+perPageSearch}
            currentPage={+page}
            setCurrentPage={onChangePage}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};
