import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone } from '../type/Phone';
import { Loader } from '../components/Loader/Loader';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { DropDown } from '../components/DropDown.tsx/DropDown';
import { SortBy } from '../type/SortByOptions';
import { NumberOptions } from '../type/NumberOptions';
import { Pagination } from '../components/Pagination/Pagination';
import { sortGoods } from '../helpers/sortGoods';
import { ProductList } from '../components/ProductList/ProductList';
import { ProductNotFoundPage } from './ProductNotFoundPage';

type Props = {
  phones: Phone[];
  isLoading: boolean;
};

export const PhonesPage: React.FC<Props> = ({ phones, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1);
  const phonesPerPage = +(searchParams.get('perPage') || 16);
  const query = searchParams.get('query');

  const indexOfLastPhone = currentPage * phonesPerPage;
  const indexOfFirstPhone = indexOfLastPhone - phonesPerPage;

  const sortBy = searchParams.get('sort') || SortBy.NEWEST;
  const itemsOnPage = +(searchParams.get('perPage') || NumberOptions.Sixteen);

  const phonesSorted = sortGoods(phones, sortBy);

  const searchedPhones = query
    ? phonesSorted.filter(phone => {
      return phone.name.toLowerCase().includes(query.toLowerCase());
    })
    : phonesSorted;

  const currentPhones = searchedPhones
    .slice(indexOfFirstPhone, indexOfLastPhone);

  const itemsOnPageArray: string[] = Object.values(NumberOptions);
  const sortByArray: string[] = Object.values(SortBy);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    setSearchParams(params);
  }, [itemsOnPage]);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <main className="phonesPage">
      <div className="container">
        <div className="phonesPage__wrapper">
          <Breadcrumbs phone={null} />
          {!!currentPhones.length && (
            <div className="phonePage__all">
              <h2 className="title phonesPage__title">Mobile phones</h2>

              <span className="phonesPage__itemsAmount">{`${searchedPhones.length} models`}</span>

              <div className="phonesPage__dropDownContainer">
                <DropDown
                  title="Sort by"
                  arrayValues={sortByArray}
                  phones={phones}
                  selectValue={sortBy}
                  param="sort"
                />

                <DropDown
                  title="Items on page"
                  arrayValues={itemsOnPageArray}
                  phones={phones}
                  selectValue={itemsOnPage}
                  param="perPage"
                />
              </div>

              <div className="phonesPage__listPhones">
                <ProductList products={currentPhones} />
              </div>

              <div className="phonesPage__pagination">
                <Pagination
                  phonesPerPage={phonesPerPage}
                  totalPhones={searchedPhones.length}
                />
              </div>
            </div>
          )}

          {!currentPhones.length && (
            <ProductNotFoundPage title="Phone was not found" />
          )}
        </div>
      </div>
    </main>
  );
};
