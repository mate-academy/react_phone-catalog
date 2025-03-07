import './Catalog.scss';
import React, { useContext, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LangContext } from '../../context/LangContext';
import { Product } from '../../types';
import { Card } from '../Card/Card';
import {
  getArrayItems,
  getItemsForPrint,
  getPages,
  getVisiblePages,
} from '../../utils/paginationUtils';
import classNames from 'classnames';
import { sortItemsBy } from '../../utils/sort';
import { translate } from '../../utils/translate';
import { useAppSelector } from '../../app/hooks';

type Props = {
  items: Product[];
};

export const Catalog: React.FC<Props> = ({ items }) => {
  const { query } = useAppSelector(state => state.query);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = Number(searchParams.get('perPage')) || 16;
  const currentPage = Number(searchParams.get('page')) || 1;
  const sortBy = searchParams.get('sort') || 'new';

  const { lang } = useContext(LangContext);
  const dropdownSortRef = useRef<HTMLDivElement | null>(null);
  const dropdownPerPageRef = useRef<HTMLDivElement | null>(null);
  const triggerSortRef = useRef<HTMLDivElement | null>(null);
  const triggerPerPageRef = useRef<HTMLDivElement | null>(null);

  const filteredItems = items.filter(item => item.name.includes(query));
  const sortedItems = sortItemsBy(filteredItems, sortBy);

  const doubleArrItems = getArrayItems(sortedItems, itemsPerPage);
  const totalPages = getPages(doubleArrItems).length;
  const itemsForPrint = getItemsForPrint(doubleArrItems, currentPage);

  const onPageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('page', page.toString());
    setSearchParams(newSearchParams);
  };

  const onSortChange = (sort: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('sort', sort);
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);

    if (dropdownSortRef.current) {
      dropdownSortRef.current.classList.toggle('dropdown--active');
      triggerSortRef?.current?.classList.toggle('dropdown__trigger--active');
    }
  };

  const onItemsPerPageChange = (perPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('perPage', perPage.toString());
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);

    if (dropdownPerPageRef.current) {
      dropdownPerPageRef.current.classList.toggle('dropdown--active');
      triggerPerPageRef?.current?.classList.toggle('dropdown__trigger--active');
    }
  };

  return (
    <div className="catalog">
      <p className="phones__text">{`${filteredItems.length} ${translate('categories.models', lang)}`}</p>
      {filteredItems.length > 0 ? (
        <div className="catalog__container">
          <div className="catalog__top">
            <div className="dropdown dropdown--sort" ref={dropdownSortRef}>
              <label
                htmlFor="dropdown-sort__trigger"
                className="dropdown__label"
              >
                Sort by
              </label>
              <div
                className="dropdown__trigger"
                id="dropdown-sort__trigger"
                ref={triggerSortRef}
                onClick={() => {
                  if (dropdownSortRef.current) {
                    dropdownSortRef.current.classList.toggle(
                      'dropdown--active',
                    );
                    triggerSortRef?.current?.classList.toggle(
                      'dropdown__trigger--active',
                    );
                  }
                }}
              >
                <span className="dropdown__trigger__text">Newest</span>
                <span className="icon icon--arrow-bottom"></span>
              </div>

              <div className="dropdown__content">
                <ul>
                  <li
                    className="dropdown__item"
                    onClick={() => onSortChange('new')}
                  >
                    {translate('sort.new', lang)}
                  </li>
                  <li
                    className="dropdown__item"
                    onClick={() => onSortChange('alpha')}
                  >
                    {translate('sort.alpha', lang)}
                  </li>
                  <li
                    className="dropdown__item"
                    onClick={() => onSortChange('alpha-desc')}
                  >
                    {translate('sort.alpha-desc', lang)}
                  </li>
                  <li
                    className="dropdown__item"
                    onClick={() => onSortChange('exp')}
                  >
                    {translate('sort.exp', lang)}
                  </li>
                  <li
                    className="dropdown__item"
                    onClick={() => onSortChange('cheap')}
                  >
                    {translate('sort.cheap', lang)}
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="dropdown dropdown--per-page"
              ref={dropdownPerPageRef}
            >
              <label
                htmlFor="dropdown-per-page__trigger"
                className="dropdown__label"
              >
                Items on page
              </label>
              <div
                className="dropdown__trigger"
                id="dropdown-per-page__trigger"
                ref={triggerPerPageRef}
                onClick={() => {
                  if (dropdownPerPageRef.current) {
                    dropdownPerPageRef.current.classList.toggle(
                      'dropdown--active',
                    );
                    triggerPerPageRef?.current?.classList.toggle(
                      'dropdown__trigger--active',
                    );
                  }
                }}
              >
                <span className="dropdown__trigger__text">{itemsPerPage}</span>
                <span className="icon icon--arrow-bottom"></span>
              </div>
              <div className="dropdown__content">
                <ul className="dropdown__list">
                  <li
                    className="dropdown__item"
                    onClick={() => onItemsPerPageChange(8)}
                  >
                    8
                  </li>
                  <li
                    className="dropdown__item"
                    onClick={() => onItemsPerPageChange(16)}
                  >
                    16
                  </li>
                  <li
                    className="dropdown__item"
                    onClick={() => onItemsPerPageChange(24)}
                  >
                    24
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="catalog__list">
            {itemsForPrint.map(item => {
              return (
                <div className="catalog__item" key={item.id}>
                  <Card item={item} discount={true} />
                </div>
              );
            })}
          </div>
          <div className="catalog__pagination">
            <li
              className={`catalog__page-item ${currentPage === 1 ? 'disabled' : ''}`}
            >
              <Link
                className={classNames(
                  'catalog__page-link button icon icon--arrow-left',
                  'catalog__page-link--left',
                  { disabled: currentPage === 1 },
                )}
                to={`?page=${currentPage - 1}&perPage=${itemsPerPage}`}
                onClick={() => {
                  if (currentPage > 1) {
                    onPageChange(currentPage - 1);
                  }
                }}
              ></Link>
            </li>
            {getVisiblePages(totalPages, currentPage).map(page => (
              <li
                className={`catalog__page-item ${page === currentPage ? 'active' : ''}`}
                key={page}
              >
                <Link
                  className={classNames('catalog__page-link button icon', {
                    active: page === currentPage,
                  })}
                  to={`?page=${page}&perPage=${itemsPerPage}`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Link>
              </li>
            ))}
            <li
              className={`catalog__page-item ${
                currentPage === totalPages ? 'disabled' : ''
              }`}
            >
              <Link
                className={classNames(
                  'catalog__page-link button icon icon--arrow-right',
                  'catalog__page-link--right',
                  { disabled: currentPage === totalPages },
                )}
                to={`?page=${currentPage + 1}&perPage=${itemsPerPage}`}
                onClick={() => {
                  if (currentPage !== totalPages) {
                    onPageChange(currentPage + 1);
                  }
                }}
              ></Link>
            </li>
          </div>
        </div>
      ) : (
        <h4>{translate('favorite.no-items', lang)}!</h4>
      )}
    </div>
  );
};
