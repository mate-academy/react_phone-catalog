/* eslint-disable no-console */
import styles from './TabletsCatalog.module.scss';
import { ProductCard } from '../../../shared/components/ProductCard';
import { getProduct } from '../../../shared/utils/fetchClient';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Product } from '../../../shared/utils/types/apiTypes';
import { SortDropDown } from '../../../shared/components/SortDropDown';
// eslint-disable-next-line max-len
import { ItemsOnPageDropDown } from '../../../shared/components/ItemsOnPageDropDown';
import { Pagination } from '../../../shared/components/Pagination';
import { STATUS, Status } from '../../../shared/utils/types/Status';
import { Loader } from '../Loader/Loader';
import { LOAD_ERROR, LoadError } from '../../../shared/utils/types/LoadError';
import { Button } from '../../../shared/components/Button';
import { useSearchParams } from 'react-router-dom';
// eslint-disable-next-line max-len
import { Breadcrumbs } from '../../../shared/components/Breadcrumbs/Breadcrumbs';

export const TabletsCatalog = () => {
  const [products, setProducts] = useState<Product[] | undefined>();
  const [status, setStatus] = useState<Status>(STATUS.idle);
  const [loadError, setLoadError] = useState<LoadError>(LOAD_ERROR.noError);
  const [searechParams] = useSearchParams();

  const sortParam = searechParams.get('sort');
  const itemsPerPage = searechParams.get('perPage');
  const currentPage = searechParams.get('page') ?? '1';

  const loadProducts = useCallback(() => {
    return getProduct('/products.json')
      .then(data => {
        setProducts(data);
        setLoadError(LOAD_ERROR.noError);
        setStatus(STATUS.resolved);
      })
      .catch(() => {
        setLoadError(LOAD_ERROR.couldntload);
        setStatus(STATUS.rejected);
      });
  }, []);

  useEffect(() => {
    setStatus(STATUS.pending);
    loadProducts();
  }, [loadProducts]);

  if (status === STATUS.resolved && products?.length === 0) {
    setLoadError(LOAD_ERROR.noProducts);
  }

  const phones = products?.filter(product => product.category === 'tablets');
  const phonesCounter = phones?.length;

  const getPages = (totalPages: number | undefined) => {
    return [...Array(totalPages)].map((_, i) => i);
  };

  let totalPages: number;

  if (phonesCounter === undefined || itemsPerPage === 'all' || !itemsPerPage) {
    totalPages = 0;
  } else {
    totalPages = Math.ceil(phonesCounter / +itemsPerPage);
  }

  const pages = getPages(totalPages);

  const filterItemsOnPage = (
    page: number[],
    product: Product[] | undefined,
    actualPage: number,
    phonesPerPage: number,
  ) => {
    const items = page;
    let elements = product;

    items.forEach((_, i) => {
      let startPosition = 0;
      let endPosition = 0;

      if (i === 0) {
        startPosition = 0;
        endPosition = phonesPerPage;
      } else {
        startPosition = i * phonesPerPage - 1;
        endPosition = startPosition + phonesPerPage;
      }

      if (i === actualPage) {
        elements = elements?.slice(startPosition, endPosition);
      }

      startPosition += phonesPerPage;
      endPosition += phonesPerPage;

      return elements;
    });

    return elements;
  };

  const sortedPhones = useMemo(() => {
    let sorted = phones;

    if (sortParam === 'age') {
      sorted = sorted?.sort((a, b) => b.year - a.year);
    }

    if (sortParam === 'price') {
      sorted = sorted?.sort((a, b) => a.price - b.price);
    }

    if (sortParam === 'title') {
      sorted = sorted?.sort((a, b) => a.name.localeCompare(b.name));
    }

    switch (itemsPerPage) {
      case '4':
        sorted = filterItemsOnPage(pages, sorted, +currentPage, +itemsPerPage);
        break;
      case '8':
        sorted = filterItemsOnPage(pages, sorted, +currentPage, +itemsPerPage);
        break;
      case '16':
        sorted = filterItemsOnPage(pages, sorted, +currentPage, +itemsPerPage);
        break;
      default:
        return sorted;
    }

    return sorted;
  }, [currentPage, itemsPerPage, pages, phones, sortParam]);

  return (
    <>
      <div className={styles.catalog}>
        <div className={styles.catalog__header}>
          <Breadcrumbs firstPath={'Tablets'} secondPath={''} />
          <h1 className={styles.catalog__title}>Tablets</h1>
          <p className={styles.catalog__counter}>{phonesCounter} models</p>
          <div className={styles['catalog__drop-downs']}>
            <SortDropDown />
            <ItemsOnPageDropDown />
          </div>
        </div>
        {loadError === LOAD_ERROR.couldntload && (
          <div>
            <h3>Somethin went wrong</h3>
            <Button text={'Reload'} />
          </div>
        )}
        {loadError === LOAD_ERROR.noProducts && <h3>There are no phones</h3>}
        {status === STATUS.pending ? (
          <Loader />
        ) : (
          <div className={styles.catalog__list}>
            {sortedPhones?.map(phone => {
              return (
                <ProductCard
                  category={phone.category}
                  id={phone.name}
                  key={phone.id}
                  name={phone.name}
                  images={phone.image}
                  priceDiscount={phone.price}
                  priceRegular={phone.fullPrice}
                  screen={phone.screen}
                  capacity={phone.capacity}
                  ram={phone.ram}
                />
              );
            })}
          </div>
        )}
        <Pagination getPages={getPages} total={phonesCounter} />
      </div>
    </>
  );
};
