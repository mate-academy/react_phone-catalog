import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import {
  Navigation,
  Dropdowns,
  PhonesPaginations,
  ProductCard,
  Loader,
} from '../../Components';

import { sortPhones } from '../../helper/preperaPhones';
import { Phone } from '../../Type/Phone';

import './phones.scss';

type Props = {
  phones: Phone[],
  isLoading: boolean,
};

export const PhonesPage: React.FC<Props> = ({ phones, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValueSortBy = searchParams.get('sortBy') || 'Newest';
  const selectedValueNumberOptions = searchParams.get('NumberOptions') || '4';
  const selectedPage = searchParams.get('page') || '1';
  const firstPhoneOnPage = +selectedValueNumberOptions * (+selectedPage - 1);
  const lastPhoneOnPage = Math.min(
    +selectedValueNumberOptions * +selectedPage, phones.length,
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    setSearchParams(params);
  }, [selectedValueNumberOptions]);

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
                  <section className="phones__list">
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
