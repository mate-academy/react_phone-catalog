import React, { useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const selectedValueSortBy = searchParams.get('sortBy') || 'Newest';
  const selectedValueNumberOptions = searchParams.get('NumberOptions') || '4';
  const [page, setPage] = useLocalStorage<number>('pages', 1);

  const firstPhoneOnPage = +selectedValueNumberOptions * (page - 1);
  const lastPhoneOnPage = Math.min(
    +selectedValueNumberOptions * page, phones.length,
  );

  const searchInPhones = phones
    .filter((product) => product.name
      .toLowerCase()
      .includes(searchQuery.trim()
        .toLowerCase()));

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

  const readyPhones = phonesOnPage(
    searchInPhones,
    firstPhoneOnPage,
    lastPhoneOnPage,
  );

  return (
    <>
      <Navigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main>
        {isLoading && <Loader />}

        {!isLoading && (
          <>
            {searchQuery !== ''
              ? (
                <>
                  <div className="title">
                    <p className="title__p">{`${searchInPhones.length} results`}</p>
                  </div>
                  <section className="container--list phones__list">
                    {searchInPhones.map(phone => (
                      <ProductCard phone={phone} key={phone.id} />
                    ))}
                  </section>
                </>
              )
              : (
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
                  </section>
                  <Dropdowns />
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

          </>
        )}

      </main>
    </>
  );
};
