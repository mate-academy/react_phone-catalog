import React, { useEffect, useRef } from 'react';
import styles from './ProductsList.module.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { ProductCard } from '../productCard/producCard';
import productsFromServer from '../../../../../public/api/products.json';
import { PhoneProps } from './productlist.types';

export const ProductsList: React.FC<PhoneProps> = ({
  currentIndex = 0,
  productCategory = [],
  perPage,
  startIndex,
}) => {
  const [searchParams] = useSearchParams();
  const listRef = useRef<HTMLUListElement>(null);

  const location = useLocation();
  const isCatalogPage =
    location.pathname === '/phones' ||
    location.pathname === '/accessories' ||
    location.pathname === '/tablets';
  const dataToRender =
    productCategory.length > 0 ? productCategory : productsFromServer;
  const currentSort = searchParams.get('sort');

  const productYear = [...dataToRender].sort((a, b) => {
    if (currentSort === 'price') {
      return a.fullPrice - b.fullPrice;
    }

    if (currentSort === 'title') {
      return a.name.localeCompare(b.name);
    }

    const ageDiff = b.year - a.year;

    return ageDiff !== 0 ? ageDiff : b.fullPrice - a.fullPrice;
  });

  useEffect(() => {
    const handleUpdateOffset = () => {
      if (listRef.current) {
        const cardWidt = listRef.current.children[0]?.clientWidth || 0;
        const offset = currentIndex * (cardWidt + 16);

        listRef.current.style.transform = `translateX(-${offset}px)`;
      }
    };

    handleUpdateOffset();
    window.addEventListener('resize', handleUpdateOffset);

    return () => {
      window.removeEventListener('resize', handleUpdateOffset);
    };
  }, [currentIndex]);

  const lastIndex = perPage + startIndex || productYear.length;

  return (
    <div
      className={classNames(styles['product__list-wrapper'], {
        [styles['product__list-wrapper--catalog']]: isCatalogPage,
      })}
    >
      <ul
        className={classNames(styles.product__list, {
          [styles['product__list--colum']]: isCatalogPage,
        })}
        ref={listRef}
      >
        {productYear.slice(startIndex, lastIndex).map(p => {
          return (
            <li className={styles['product__list-item']} key={p.itemId}>
              <ProductCard product={p} onCatalogPage={isCatalogPage} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
