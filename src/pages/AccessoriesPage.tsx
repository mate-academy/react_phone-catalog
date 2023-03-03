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
  accessories: Product[];
};

export const AccessoriesPage: React.FC<Props> = ({ accessories }) => {
  const [query, setQuery] = useState('');
  const total = accessories.length;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const perPageSearch = searchParams.get('perPage') || '4';
  const sortOption = searchParams.get('sort') || 'age';

  const onChangePage = (currentPage: number) => {
    setSearchParams(
      getSearchWith(searchParams, { page: `${currentPage}` }),
    );
  };

  const accessoryPrice = (accessory: Product) => {
    if (accessory.discount > 0) {
      return (accessory.price - (accessory.price * accessory.discount) / 100);
    }

    return accessory.price;
  };

  const filteredProducts = query
    ? accessories.filter(phone => {
      return phone.name.toLowerCase().includes(query.toLowerCase().trim());
    })
    : [...accessories];

  const getSortedAccessories = () => {
    const sortedAccessories = [...filteredProducts]
      .sort((accessory1, accessory2) => {
        switch (sortOption) {
          case 'name':
            return accessory1.name.localeCompare(accessory2.name);

          case 'age':
            return accessory1.age - accessory2.age;

          case 'price':
            return accessoryPrice(accessory1) - accessoryPrice(accessory2);

          default:
            return 0;
        }
      });

    return sortedAccessories;
  };

  const sortedAccessories = useMemo(
    getSortedAccessories,
    [accessories, sortOption, filteredProducts],
  );

  const lastItem = +page * +perPageSearch;
  const firstItem = lastItem - +perPageSearch;

  const currentItems = sortedAccessories.slice(firstItem, lastItem);

  return (
    <div className="page">
      <Header search="accessories" setQuery={setQuery} />

      <div className="page__content">
        <section className="page__section">
          {!accessories.length
            ? (
              <NoResults categoryName="Accessories" />
            ) : (
              <>
                <div className="page__links-wrapper">
                  <Breadcrumbs text="Accessories" />
                </div>

                <h1 className="page__title">Accessories</h1>

                <h2 className="page__subtitle">
                  {`${accessories.length} models`}
                </h2>

                {!!sortedAccessories.length && (
                  <Dropdowns total={total} />
                )}

                <ProductsList phones={currentItems} />

                {!sortedAccessories.length && <NoSearchResults />}

                {total > +perPageSearch && !!sortedAccessories.length && (
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
