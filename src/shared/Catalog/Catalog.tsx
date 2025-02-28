import { useEffect, useMemo, useState } from 'react';
import { Article } from '../types/Article';
import { SortMethods } from '../types/SortMethods';
import styles from './Catalog.module.scss';
import { Product } from '../Product';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from '../Loader';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from '../functions/ScrollToTop';
type Props = {
  products: Article[] | null;
};

export const Catalog: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') || '1';
  const initialSortMethod =
    (searchParams.get('sort') as SortMethods) || SortMethods.nawest;

  const [method, setMethod] = useState<SortMethods>(initialSortMethod);
  const [count, setCount] = useState<number | string>(
    searchParams.get('count') === 'all'
      ? 'all'
      : parseInt(searchParams.get('count') || '16', 10),
  );
  const [query, setQuery] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', method);
    newParams.set('count', count === 'all' ? 'all' : count.toString());
    setSearchParams(newParams);
  }, [method, count, searchParams, setSearchParams]);

  const visibleProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    let sorted = [...products].sort((a, b) => {
      switch (method) {
        case SortMethods.nawest:
          return b.year - a.year;
        case SortMethods.alph:
          return a.name.localeCompare(b.name);
        case SortMethods.chapest:
          return a.fullPrice - a.price - (b.fullPrice - b.price);
        default:
          return 0;
      }
    });

    if (query) {
      sorted = sorted.filter((el: Article) =>
        el.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (count === 'all') {
      return sorted;
    }

    const numericCount = parseInt(count as string, 10);
    const startIndex = (parseInt(page) - 1) * numericCount;
    const endIndex = startIndex + numericCount;

    return sorted.slice(startIndex, endIndex);
  }, [method, products, count, page, query]);

  const countPages = useMemo(() => {
    if (!products) {
      return 1;
    }

    if (count === 'all') {
      return 1;
    }

    return Math.ceil(products.length / parseInt(count as string, 10));
  }, [count, products]);

  const handleNextPage = () => {
    const nextPage = parseInt(page) + 1;
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', nextPage.toString());
    scrollToTop();
    setSearchParams(newParams);
  };

  const handlePrevPage = () => {
    const prevPage = parseInt(page) - 1;

    if (prevPage > 0) {
      const newParams = new URLSearchParams(searchParams);

      newParams.set('page', prevPage.toString());
      scrollToTop();
      setSearchParams(newParams);
    }
  };

  const handleQueryChange = debounce((value: string) => {
    setQuery(value);
  }, 500);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    const currentQuery = newParams.get('guery');

    if (query) {
      if (!currentQuery || currentQuery === query) {
        newParams.set('query', query);
      }
    } else if (
      (currentQuery && !query) ||
      (currentQuery && query?.length === 0)
    ) {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  }, [query, searchParams, setSearchParams]);

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__parameters}>
        <div className={styles.catalog__wrapper}>
          <p className={styles.catalog__sortName}>{t('ctl_sortBy')}</p>
          <select
            className={styles['catalog__select--1']}
            onChange={e => setMethod(e.target.value as SortMethods)}
            value={method}
          >
            <option value={SortMethods.nawest}>{t('ctl_nawest')}</option>
            <option value={SortMethods.alph}>{t('ctl_alphabet')}</option>
            <option value={SortMethods.chapest}>{t('ctl_chap')}</option>
          </select>
        </div>

        <div className={styles.catalog__wrapper}>
          <p className={styles.catalog__sortName}>{t('ctl_itemsPage')}</p>
          <select
            className={styles['catalog__select--2']}
            onChange={e =>
              setCount(
                e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10),
              )
            }
          >
            <option value={16}>16</option>
            <option value={8}>8</option>
            <option value={4}>4</option>
            <option value="all">{t('ctl_all')}</option>
          </select>
        </div>

        <div className={styles.catalog__queryWrapper}>
          <p className={styles.catalog__sortName}>{t('ctl_searchProduct')}</p>
          <input
            className={styles.catalog__queryInput}
            type="text"
            placeholder={t('ctl_enterName')}
            onChange={e => handleQueryChange(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.catalog__content}>
        {products ? (
          visibleProducts?.map(currentProduct => {
            return (
              <Product
                key={currentProduct.id}
                article={currentProduct}
                fullPrice={true}
                isCatalog={true}
              />
            );
          })
        ) : (
          <Loader />
        )}
      </div>

      {products && visibleProducts?.length === 0 && (
        <>
          <p>{t('ctl_error')}</p>
          <img
            src={`${import.meta.env.BASE_URL}/img/product-not-found.png`}
            alt="image"
            style={{ height: '40vh' }}
          />
        </>
      )}
      {products && visibleProducts && visibleProducts.length > 0 && (
        <div className={styles.catalog__pages}>
          <button className={styles.catalog__button} onClick={handlePrevPage}>
            {'<'}
          </button>

          {Array.from({ length: countPages }, (_, index) => {
            return (
              <button
                key={index}
                className={classNames(styles.catalog__button, {
                  [styles.catalog__button__active]:
                    parseInt(page) === index + 1,
                })}
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);

                  newParams.set('page', (index + 1).toString());
                  scrollToTop();
                  setSearchParams(newParams);
                }}
              >
                {index + 1}
              </button>
            );
          })}
          <button className={styles.catalog__button} onClick={handleNextPage}>
            {'>'}
          </button>
        </div>
      )}
    </div>
  );
};
