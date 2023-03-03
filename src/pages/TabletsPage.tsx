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
import { NoResults } from '../components/NoResults/NoResults';
import { NoSearchResults } from '../components/NoSearchResults/NoSearchResults';
import { Footer } from '../components/Footer/Footer';

type Props = {
  tablets: Product[];
};

export const TabletsPage: React.FC<Props> = ({ tablets }) => {
  const [query, setQuery] = useState('');
  const total = tablets.length;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const perPageSearch = searchParams.get('perPage') || '4';
  const sortOption = searchParams.get('sort') || 'age';

  const onChangePage = (currentPage: number) => {
    setSearchParams(
      getSearchWith(searchParams, { page: `${currentPage}` }),
    );
  };

  const tabletPrice = (tablet: Product) => {
    if (tablet.discount > 0) {
      return (tablet.price - (tablet.price * tablet.discount) / 100);
    }

    return tablet.price;
  };

  const filteredProducts = query
    ? tablets.filter(tablet => {
      return tablet.name.toLowerCase().includes(query.toLowerCase().trim());
    })
    : [...tablets];

  const getSortedTablets = () => {
    const sortedTablets = [...filteredProducts].sort((tablet1, tablet2) => {
      switch (sortOption) {
        case 'name':
          return tablet1.name.localeCompare(tablet2.name);

        case 'age':
          return tablet1.age - tablet2.age;

        case 'price':
          return tabletPrice(tablet1) - tabletPrice(tablet2);

        default:
          return 0;
      }
    });

    return sortedTablets;
  };

  const sortedTablets = useMemo(
    getSortedTablets,
    [tablets, sortOption, filteredProducts],
  );

  const lastItem = +page * +perPageSearch;
  const firstItem = lastItem - +perPageSearch;

  const currentItems = sortedTablets.slice(firstItem, lastItem);

  return (
    <div className="page">
      <Header search="tablets" setQuery={setQuery} />

      <div className="page__content">
        <section className="page__section">
          {!tablets.length
            ? (
              <NoResults categoryName="Tablets" />
            ) : (
              <>
                <div className="page__links-wrapper">
                  <Breadcrumbs text="Tablets" />
                </div>

                <h1 className="page__title">Tablets</h1>

                <h2 className="page__subtitle">
                  {`${tablets.length} models`}
                </h2>

                {!!sortedTablets.length && (
                  <Dropdowns total={total} />
                )}

                <ProductsList phones={currentItems} />

                {!sortedTablets.length && <NoSearchResults />}

                {total > +perPageSearch && !!sortedTablets.length && (
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
