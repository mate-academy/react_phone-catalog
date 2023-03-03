import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import './page.scss';
import { Product } from '../types/Product';
import { getSearchWith } from '../helpers/getSearchWith';

import { Header } from '../components/Header/Header';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { Dropdowns } from '../components/Dropdowns/Dropdowns';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { Paginations } from '../components/Paginations/Paginations';
import { NoSearchResults } from '../components/NoSearchResults/NoSearchResults';
import { NoResults } from '../components/NoResults/NoResults';
import { Footer } from '../components/Footer/Footer';

type Props = {
  phones: Product[];
};

export const PhonesPage: React.FC<Props> = ({ phones }) => {
  const [query, setQuery] = useState('');
  const total = phones.length;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const perPageSearch = searchParams.get('perPage') || '4';
  const sortOption = searchParams.get('sort') || '';

  const onChangePage = (currentPage: number) => {
    setSearchParams(
      getSearchWith(searchParams, { page: `${currentPage}` }),
    );
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
        <section className="page__section">
          {!phones.length
            ? (
              <NoResults categoryName="Phones" />
            ) : (
              <>
                <div className="page__links-wrapper">
                  <Breadcrumbs text="Phones" />
                </div>

                <h1 className="page__title">Mobile phones</h1>

                <h2 className="page__subtitle">
                  {`${phones.length} models`}
                </h2>

                {!!sortedPhones.length && (
                  <Dropdowns total={total} />
                )}

                <ProductsList phones={currentItems} />

                {!sortedPhones.length && <NoSearchResults />}

                {total > +perPageSearch && !!sortedPhones.length && (
                  <Paginations
                    total={total}
                    perPage={+perPageSearch}
                    currentPage={+page}
                    setCurrentPage={onChangePage}
                  />
                )}
              </>
            )}
        </section>
      </div>

      <Footer />
    </div>
  );
};
