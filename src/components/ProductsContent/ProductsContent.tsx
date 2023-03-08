import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';
import '../../pages/page.scss';
import { Product } from '../../types/Product';
import { SortOptions } from '../../types/SortOptions';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Dropdowns } from '../Dropdowns/Dropdowns';
import { NoResults } from '../NoResults/NoResults';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';
import { Paginations } from '../Paginations/Paginations';
import { ProductsList } from '../ProductsList/ProductsList';

type Props = {
  products: Product[];
  query: string;
  title: string;
  categoryName: string;
};

export const ProductsContent: React.FC<Props> = ({
  products,
  query,
  title,
  categoryName,
}) => {
  const total = products.length;

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
    ? products.filter(phone => {
      return phone.name.toLowerCase().includes(query.toLowerCase().trim());
    })
    : [...products];

  const getSortedPhones = () => {
    const sortedPhones = [...filteredProducts].sort((phone1, phone2) => {
      switch (sortOption) {
        case SortOptions.Name:
          return phone1.name.localeCompare(phone2.name);

        case SortOptions.Age:
          return phone1.age - phone2.age;

        case SortOptions.Price:
          return phonePrice(phone1) - phonePrice(phone2);

        default:
          return 0;
      }
    });

    return sortedPhones;
  };

  const sortedPhones = useMemo(
    getSortedPhones,
    [products, sortOption, filteredProducts],
  );

  const lastItem = +page * +perPageSearch;
  const firstItem = lastItem - +perPageSearch;

  const currentItems = sortedPhones.slice(firstItem, lastItem);

  return (
    <section className="page__section">
      {!products.length
        ? (
          <NoResults categoryName={categoryName} />
        ) : (
          <>
            <div className="page__links-wrapper">
              <Breadcrumbs text={categoryName} />
            </div>

            <h1 className="page__title">
              {title}
            </h1>

            <h2 className="page__subtitle">
              {`${products.length} models`}
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
  );
};
