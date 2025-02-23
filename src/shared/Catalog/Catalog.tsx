import { useEffect, useMemo, useState } from 'react';
import { Article } from '../types/Article';
import { SortMethods } from '../types/SortMethods';
import styles from './Catalog.module.scss';
import { Product } from '../Product';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from '../Loader';

type Props = {
  products: Article[] | null;
};

export const Catalog: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') || '1';
  const initialCount = parseInt(searchParams.get('count') || '16');
  const initialSortMethod =
    (searchParams.get('sort') as SortMethods) || SortMethods.nawest;

  const [method, setMethod] = useState<SortMethods>(initialSortMethod);
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', method);
    newParams.set('count', count.toString());

    setSearchParams(newParams);
  }, [method, count, searchParams, setSearchParams]);

  const visibleProducts = useMemo(() => {
    if (!products) {
      return;
    }

    const sorted = [...products].sort((a, b) => {
      switch (method) {
        case SortMethods.nawest:
          return b.year - a.year;

        case SortMethods.oldest:
          return a.year - b.year;

        case SortMethods.priceHigh:
          return b.price - a.price;

        case SortMethods.priceLow:
          return a.price - b.price;

        default:
          return 0;
      }
    });
    const startIndex = (parseInt(page) - 1) * count;
    const endIndex = startIndex + count;

    return sorted.slice(startIndex, endIndex);
  }, [method, products, count, page]);

  const countPages = useMemo(() => {
    return products ? Math.ceil(products.length / count) : 1;
  }, [count, products]);

  const handleNextPage = () => {
    const nextPage = parseInt(page) + 1;
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', nextPage.toString());
    setSearchParams(newParams);
  };

  const handlePrevPage = () => {
    const prevPage = parseInt(page) - 1;

    if (prevPage > 0) {
      const newParams = new URLSearchParams(searchParams);

      newParams.set('page', prevPage.toString());
      setSearchParams(newParams);
    }
  };

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__parameters}>
        <div className={styles.catalog__wrapper}>
          <p className={styles.catalog__sortName}>Sort By</p>
          <select
            className={styles['catalog__select--1']}
            onChange={e => setMethod(e.target.value as SortMethods)}
            value={method}
          >
            <option value={SortMethods.nawest}>{SortMethods.nawest}</option>
            <option value={SortMethods.oldest}>{SortMethods.oldest}</option>
            <option value={SortMethods.priceHigh}>
              {SortMethods.priceHigh}
            </option>
            <option value={SortMethods.priceLow}>{SortMethods.priceLow}</option>
          </select>
        </div>

        <div className={styles.catalog__wrapper}>
          <p className={styles.catalog__sortName}>Items on Page</p>
          <select
            className={styles['catalog__select--2']}
            onChange={e => setCount(parseInt(e.target.value))}
          >
            <option value={16}>16</option>
            <option value={14}>14</option>
            <option value={12}>12</option>
            <option value={10}>10</option>
          </select>
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
      <div className={styles.catalog__pages}>
        <button className={styles.catalog__button} onClick={handlePrevPage}>
          {'<'}
        </button>

        {Array.from({ length: countPages }, (_, index) => {
          return (
            <button
              key={index}
              className={classNames(styles.catalog__button, {
                [styles.catalog__button__active]: parseInt(page) === index + 1,
              })}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);

                newParams.set('page', (index + 1).toString());
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
    </div>
  );
};
