import styles from './Catalog.module.scss';
import stylesIcon from '../../styles/icon.module.scss';
import stylesBtn from '../../styles/button.module.scss';
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
import { Sort } from '../../utils/enums';

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
      dropdownSortRef.current.classList.toggle(styles.dropdown__active);
      triggerSortRef?.current?.classList.toggle(
        styles.dropdown__trigger__active,
      );
    }
  };

  const onItemsPerPageChange = (perPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('perPage', perPage.toString());
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);

    if (dropdownPerPageRef.current) {
      dropdownPerPageRef.current.classList.toggle(styles.dropdown__active);
      triggerPerPageRef?.current?.classList.toggle(
        styles.dropdown__trigger__active,
      );
    }
  };

  return (
    <div className={styles.catalog}>
      <p
        className={styles.catalog__length}
      >{`${filteredItems.length} ${translate('categories.models', lang)}`}</p>
      {filteredItems.length > 0 ? (
        <div className={styles.catalog__container}>
          <div className={styles.catalog__top}>
            <div
              className={`${styles.dropdown} ${styles.dropdown__sort}`}
              ref={dropdownSortRef}
            >
              <label
                htmlFor="dropdown-sort__trigger"
                className={styles.dropdown__label}
              >
                Sort by
              </label>
              <div
                className={styles.dropdown__trigger}
                id="dropdown-sort__trigger"
                ref={triggerSortRef}
                onClick={() => {
                  if (dropdownSortRef.current) {
                    dropdownSortRef.current.classList.toggle(
                      styles.dropdown__active,
                    );
                    triggerSortRef?.current?.classList.toggle(
                      styles.dropdown__trigger__active,
                    );
                  }
                }}
              >
                <span className={styles.dropdown__trigger__text}>Newest</span>
                <span
                  className={`${stylesIcon.icon} ${stylesIcon.icon__arrowBottom}`}
                ></span>
              </div>

              <div className={styles.dropdown__content}>
                <ul>
                  {Object.values(Sort).map(sortValue => (
                    <li
                      className={styles.dropdown__item}
                      key={sortValue}
                      onClick={() => onSortChange(sortValue)}
                    >
                      {translate(`sort.${sortValue}`, lang)}
                    </li>
                  ))}
                  {/* <li
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
                  </li> */}
                </ul>
              </div>
            </div>
            <div
              className={`${styles.dropdown} ${styles.dropdown__perPage}`}
              ref={dropdownPerPageRef}
            >
              <label
                className={styles.dropdown__label}
                htmlFor="dropdown-per-page__trigger"
              >
                Items on page
              </label>
              <div
                className={styles.dropdown__trigger}
                id="dropdown-per-page__trigger"
                ref={triggerPerPageRef}
                onClick={() => {
                  if (dropdownPerPageRef.current) {
                    dropdownPerPageRef.current.classList.toggle(
                      styles.dropdown__active,
                    );
                    triggerPerPageRef?.current?.classList.toggle(
                      styles.dropdown__trigger__active,
                    );
                  }
                }}
              >
                <span className={styles.dropdown__trigger__text}>
                  {itemsPerPage}
                </span>
                <span
                  className={`${stylesIcon.icon} ${stylesIcon.icon__arrowBottom}`}
                ></span>
              </div>
              <div className={styles.dropdown__content}>
                <ul className={styles.dropdown__list}>
                  <li
                    className={styles.dropdown__item}
                    onClick={() => onItemsPerPageChange(8)}
                  >
                    8
                  </li>
                  <li
                    className={styles.dropdown__item}
                    onClick={() => onItemsPerPageChange(16)}
                  >
                    16
                  </li>
                  <li
                    className={styles.dropdown__item}
                    onClick={() => onItemsPerPageChange(24)}
                  >
                    24
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.catalog__list}>
            {itemsForPrint.map(item => {
              return (
                <div className={styles.catalog__item} key={item.id}>
                  <Card item={item} discount={true} fullwidth={true} />
                </div>
              );
            })}
          </div>
          <div className={styles.catalog__pagination}>
            <li
              className={`${styles.catalog__pageItem} ${currentPage === 1 ? styles.disabled : ''}`}
            >
              <Link
                className={classNames(
                  styles.catalog__pageLink,
                  stylesBtn.button,
                  stylesIcon.icon,
                  stylesIcon.icon__arrowLeft,
                  styles.catalog__pageLink__left,
                  { [styles.disabled]: currentPage === 1 },
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
                className={`${styles.catalog__pageItem} ${page === currentPage ? styles.active : ''}`}
                key={page}
              >
                <Link
                  className={classNames(
                    styles.catalog__pageLink,
                    stylesBtn.button,
                    stylesIcon.icon,
                    {
                      [styles.active]: page === currentPage,
                    },
                  )}
                  to={`?page=${page}&perPage=${itemsPerPage}`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Link>
              </li>
            ))}
            <li
              className={`${styles.catalog__pageItem} ${
                currentPage === totalPages ? styles.disabled : ''
              }`}
            >
              <Link
                className={classNames(
                  styles.catalog__pageLink,
                  stylesBtn.button,
                  stylesIcon.icon,
                  stylesIcon.icon__arrowRight,
                  styles.catalog__pageLink__right,
                  { [styles.disabled]: currentPage === totalPages },
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
        <div className={styles.catalog__noItems}>
          <h4>{translate('favorite.no-items', lang)}!</h4>
        </div>
      )}
    </div>
  );
};
