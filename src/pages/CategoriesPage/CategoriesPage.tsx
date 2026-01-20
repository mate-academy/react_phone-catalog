/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';
import { ProductCategory } from '../../types/ProductCategory';
import { Sort, SORT_OPTIONS } from '../../types/Sort';
import { ProductsList } from '../../components/ProductsList';
import { Select } from '../../elements/Select/Select';
import { getSearchWith, SearchParams } from '../../utils/search/searchHelper';
import styles from './CategoriesPage.module.scss';
import React, { useEffect, useMemo, useState } from 'react';
import { PER_PAGE_OPTIONS, PerPage } from '../../types/PerPages';
import { useDropdownController } from '../../utils/hooks/UI/useDropdownController';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Plug } from '../../components/Plug/Plug';
import { scrollTop } from '../../services/layouts';
import { useCategoryPage } from './useCategoryPage';

import debounce from 'lodash.debounce';

type Props = {
  category: ProductCategory;
};

const DEFAULT_SORT: Sort = 'new';
const DEFAULT_PER_PAGE: PerPage = '8';

export const CategoriesPage: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const page = Number(searchParams.get('page') || 1);
  const perPage = (searchParams.get('perPage') || DEFAULT_PER_PAGE) as PerPage;
  const sort = (searchParams.get('sort') || DEFAULT_SORT) as Sort;
  const query = searchParams.get('query') || '';
  const [appliedQuery, setAppliedQuery] = useState(query);
  const dropdown = useDropdownController();

  const { products, total, isLoading, error, refetch } = useCategoryPage({
    category,
    page,
    perPage,
    sort,
    query: appliedQuery,
  });

  const debouncedApplyQuery = useMemo(() => debounce(setAppliedQuery, 300), []);
  const totalPages = perPage === 'all' ? 1 : Math.ceil(total / Number(perPage));
  const isPlugVisible = !isLoading && products.length === 0 && !error;
  const isListVisible = !isLoading && products.length > 0 && !error;

  const setSearchWithData = (data: SearchParams) => {
    setSearchParams(getSearchWith(searchParams, data));
  };

  const handleChangeQuery = (value: string) => {
    setSearchWithData({
      page: null,
      query: value ? value : null,
    });

    debouncedApplyQuery(value);
  };

  const handleSort = (value: Sort) => {
    setSearchWithData({
      sort: value === DEFAULT_SORT ? null : value,
      page: null,
    });
  };

  const handlePerPage = (value: PerPage) => {
    setSearchWithData({
      perPage: value === DEFAULT_PER_PAGE ? null : value,
      page: null,
    });
  };

  useEffect(() => {
    scrollTop();
  }, [page]);

  useEffect(() => {
    return () => {
      debouncedApplyQuery.cancel();
    };
  }, [debouncedApplyQuery]);

  return (
    <section className={styles.CategoriesPage__section}>
      <h1 className={styles['CategoriesPage__header-text']}>
        {t(`${category}Page`)}
      </h1>

      {error && (
        <div className={styles.CategoriesPage__plug}>
          <Plug label={t(`errors.${error}`)}>
            <button
              onClick={refetch}
              className="button button--filled button--big button--width100"
            >
              {t('tryAgain')}
            </button>
          </Plug>
        </div>
      )}

      {!error && (
        <>
          <p className={styles.CategoriesPage__models}>
            {t('modelsCount', { count: total })}
          </p>
          <div className={styles.CategoriesPage__actions}>
            <Select<Sort>
              label={t('labels.sortBy')}
              listItem={SORT_OPTIONS}
              selectedItems={[sort]}
              isOpen={dropdown.isOpen('sort')}
              onToggle={() => dropdown.toggle('sort')}
              onClose={dropdown.closeAll}
              onSelect={handleSort}
              rootRef={dropdown.register('sort')}
              className={classNames(
                styles.CategoriesPage__select,
                styles['CategoriesPage__select--sort'],
              )}
              renderLabel={value => t(`sort.${value}`)}
            />

            <Select<PerPage>
              label={t('labels.itemsPerPage')}
              listItem={PER_PAGE_OPTIONS}
              selectedItems={[perPage]}
              isOpen={dropdown.isOpen('perPage')}
              onToggle={() => dropdown.toggle('perPage')}
              onClose={dropdown.closeAll}
              onSelect={handlePerPage}
              rootRef={dropdown.register('perPage')}
              className={classNames(
                styles.CategoriesPage__select,
                styles['CategoriesPage__select--perPage'],
              )}
              renderLabel={value => t(`perPage.${value}`)}
            />
          </div>
          <div className={styles.CategoriesPage__inputWrapper}>
            <p className={styles.CategoriesPage__inputDescription}>
              {t('labels.search')}
            </p>
            <input
              placeholder={t('Search by name')}
              value={query}
              type="text"
              className={classNames('input input--height40 input--witdh100')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeQuery(event.target.value)
              }
            />
          </div>
        </>
      )}

      {isLoading && (
        <ProductsList
          skeletonLenght={
            perPage === 'all' ? Number(DEFAULT_PER_PAGE) : Number(perPage)
          }
        />
      )}

      {isPlugVisible && (
        <div className={styles.CategoriesPage__plug}>
          <Plug label={t('noProducts', { category })} />
        </div>
      )}

      {isListVisible && (
        <>
          <ProductsList products={products} />
        </>
      )}

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </section>
  );
};
