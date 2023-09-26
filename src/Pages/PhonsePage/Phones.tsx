import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import {
  Navigation,
  Dropdowns,
  PhonesPaginations,
  ProductCard,
  Loader,
} from '../../Components';

import { sortPhones } from '../../helper/preperaPhones';
import { useLocalStorage } from '../../utils/UseLocalStorege';
import { Phone } from '../../Type/Phone';

import './phones.scss';

type Props = {
  phones: Phone[],
  isLoading: boolean,
};

export const PhonesPage: React.FC<Props> = ({ phones, isLoading }) => {
  const [searchParams] = useSearchParams();
  const selectedValueSortBy = searchParams.get('sortBy') || 'Newest';
  const selectedValueNumberOptions = searchParams.get('NumberOptions') || '4';
  const [page, setPage] = useLocalStorage<number>('pages', 1);

  const firstPhoneOnPage = +selectedValueNumberOptions * (page - 1);
  const lastPhoneOnPage = Math.min(
    +selectedValueNumberOptions * page, phones.length,
  );

  const sortedPhones = sortPhones(phones, selectedValueSortBy);

  const phonesOnPage = (
    phonesForPage: Phone[],
    firstOnPage: number,
    lastOnPage: number,
  ) => {
    if (!firstOnPage && !lastOnPage) {
      return phonesForPage;
    }

    return sortedPhones.slice(firstOnPage, lastOnPage);
  };

  const readyPhones = phonesOnPage(phones, firstPhoneOnPage, lastPhoneOnPage);

  return (
    <>
      <Navigation />
      <main>
        {isLoading && <Loader />}

        {!isLoading && (
          <>

            <section className="phones">
              <div className="breadcrumbs">
                <Link
                  to="/"
                  className="breadcrumbs__button breadcrumbs__icon"
                />
                <div className="breadcrumbs__arrow breadcrumbs__icon" />
                <p>
                  Phones
                </p>
              </div>
              <div className="title">
                <h1>Mobile phones</h1>

                <p className="title__p">{`${phones.length} models`}</p>
              </div>
              <Dropdowns />
            </section>
            <section className="container--list phones__list">
              {readyPhones.map(phone => (
                <ProductCard phone={phone} key={phone.id} />
              ))}
            </section>
            <section className="pagination">
              {selectedValueNumberOptions !== 'All' && (
                <PhonesPaginations
                  phones={phones}
                  currentPage={page}
                  setCurrentPage={setPage}
                />
              )}
            </section>
          </>
        )}

      </main>
    </>
  );
};
