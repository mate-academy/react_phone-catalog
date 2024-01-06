/* eslint-disable import/no-extraneous-dependencies */
import { Link, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import {
  client,
  getAllProducts,
} from '../../helpers/utils/fetchData';
import { Phone } from '../../Types/Phone';
import { Loader } from '../../components/Loader/Loader';
import { Card } from '../../components/Card/Card';
import {
  SortDropdown, SortField,
} from '../../components/Dropdowns/SortDropdown';
import {
  ItemsPerPageDropdown,
} from '../../components/Dropdowns/ItemsPerPageDropdown';
import arrowRight from '../../images/arrow-right-secondary-color.svg';
import { Categories } from '../../Types/Categories';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';
import { SearchResult } from '../../components/SearchResult/SearchResult';

export const PhonesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [phones, setPhones] = useState<Phone[]>([]);
  const sort = searchParams.get('sort') || '';
  const itemsPerPage = +(searchParams.get('perPage') || 16);
  const [preparedPhones, setPreparedPhones] = useState(phones);
  const page = +(searchParams.get('page') || 1);

  const { query } = useProducts();
  const [searchingPhones, setSearchingPhones] = useState(preparedPhones);

  const prevButton = document.querySelector('.previous');

  prevButton?.replaceWith(prevButton.cloneNode(true));

  const handlePageClick = (event: { selected: number; }) => {
    const newPage = event.selected + 1;

    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev.toString());

      newParams.set('page', newPage.toString());

      return newParams;
    });
  };

  useEffect(() => {
    const currPage = +(searchParams.get('page') || 1);
    const linkPrevButton = prevButton?.querySelector('a');

    if (currPage > 1) {
      if (linkPrevButton) {
        linkPrevButton.tabIndex = 0;
      }
      // prevButton?.classList.remove('disabled');
    }
  }, [searchParams, prevButton]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    const lowerQuery = query.toLowerCase();

    const searching = preparedPhones.filter(
      i => i.name.toLowerCase().includes(lowerQuery),
    );

    setSearchingPhones(searching);
  }, [query, preparedPhones]);

  useEffect(() => {
    const getSorted = () => {
      const sortedPhones = [...phones];

      switch (sort) {
        case SortField.PRICE:
          sortedPhones.sort((a, b) => (a.price - b.price));

          break;

        case SortField.NAME:
          sortedPhones.sort((a, b) => (a.name.localeCompare(b.name)));

          break;

        default:
          sortedPhones.sort((a, b) => (b.year - a.year));
      }

      return sortedPhones;
    };

    const newPhones = getSorted();

    setPreparedPhones(newPhones);
  }, [phones, sort]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetchProducts();

        const mappedData = data.map((phone) => {
          return { ...phone, name: `${phone.name} (iMT9G2FS/A)` };
        });

        setPhones(getAllProducts(mappedData, Categories.Phones));
        setIsLoading(false);
      } catch (error) {
        throw new Error();
      }
    };

    fetchData();
  }, [setPhones]);

  const itemOffset = (page - 1) * itemsPerPage;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = preparedPhones.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(phones.length / itemsPerPage);

  useEffect(() => {
    const ul = document.querySelector('ul[role="navigation"]');
    const listItems = ul?.querySelectorAll('li');
    const paramsPage = searchParams.get('page');

    listItems?.forEach(li => {
      if (li.classList.contains('selected') && li.innerText !== paramsPage) {
        li.classList.remove('selected');
      }

      if (!li.classList.contains('selected') && li.innerText === paramsPage) {
        li.classList.add('selected');
      }
    });
  }, [searchParams]);

  return (
    <>
      {query ? (
        <SearchResult results={searchingPhones} />
      ) : (
        <div className="phones">
          <div className="path" data-cy="breadCrumbs">
            <Link to="/" className="go-home" />
            <img src={arrowRight} alt="arrow_right" />
            <h3>Phones</h3>
          </div>
          <h1 className="phones__title">Mobile phones</h1>
          <p className="phones__paragraph">{`${phones.length} models`}</p>
          <div className="dropdowns-container">
            <SortDropdown />
            <ItemsPerPageDropdown
              currentAmount={itemsPerPage}
              length={phones.length}
            />
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="phones-container">
              {currentItems.map(phone => (
                <Card card={phone} discount key={phone.id} />
              ))}
            </div>
          )}
          {(itemsPerPage >= 4 && itemsPerPage < phones.length) && (
            <ReactPaginate
              breakLabel="..."
              nextLabel=""
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel=""
              renderOnZeroPageCount={null}
              initialPage={page - 1}
            />
          )}
        </div>
      )}
    </>
  );
};
