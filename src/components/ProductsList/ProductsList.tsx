import { useEffect, useMemo, useState } from 'react';
import styles from './ProductsList.module.scss';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '../Dropdown';
import { Product } from '../../modules/shared/types/Product';
import { ProductGrid } from '../ProductGrid';

export const ProductsList = ({ products }: { products: Product[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get('page')) || 1;
  const initialPerPage = searchParams.get('perPage') || 'all';
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);

  const initialFilterValues = searchParams.get('sort') || 'all';
  const [filterValues, setFilterValues] = useState<string>(initialFilterValues);

  const optionsItemsPerPage = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: 'all', label: 'All' },
  ];

  const optionsForSort = [
    { value: 'newest', label: 'Newest' },
    { value: 'alphabetically', label: 'Alphabetically' },
    { value: 'cheapest', label: 'Cheapest' },
    { value: 'all', label: 'All' },
  ];

  const filteredProduct = () => {
    if (filterValues === 'all') {
      return [...products];
    }

    return [...products].sort((a, b) => {
      if (filterValues === 'newest') {
        return b.year - a.year;
      }

      if (filterValues === 'alphabetically') {
        return b.name.localeCompare(a.name);
      }

      if (filterValues === 'cheapest') {
        return a.price - b.price;
      }

      return 0;
    });
  };

  const filteredProducts = filteredProduct();

  const getProductsToShow = () => {
    if (itemsPerPage === 'all') {
      return filteredProducts;
    }

    const perPage = Number(itemsPerPage);
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return filteredProducts.slice(start, end);
  };

  const visibleProducts = getProductsToShow();

  useEffect(() => {
    const params = new URLSearchParams();

    if (currentPage !== 1) {
      params.set('page', String(currentPage));
    }

    if (itemsPerPage !== 'all') {
      params.set('perPage', String(itemsPerPage));
    }

    if (filterValues !== 'all') {
      params.set('sort', filterValues);
    }

    setSearchParams(params, { replace: true });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage, filterValues, itemsPerPage, setSearchParams]);

  const pages: number[] = useMemo(() => {
    const pagesArray = [];

    if (products) {
      for (let i = 1; i <= Math.ceil(products.length / +itemsPerPage); i++) {
        pagesArray.push(i);
      }
    }

    return pagesArray;
  }, [itemsPerPage, products.length]);

  const finalPages = useMemo(() => {
    const pageNumber = Number(searchParams.get('page')) || 1;
    const totalPages = pages.length;

    if (totalPages <= 1) {
      return [];
    }

    if (totalPages <= 3) {
      return pages.slice(1);
    }

    if (pageNumber <= 2) {
      return pages.slice(1, 3);
    }

    if (pageNumber >= totalPages - 1) {
      return pages.slice(totalPages - 3, totalPages);
    }

    const currentIndex = pageNumber - 1;

    return pages.slice(currentIndex - 1, currentIndex + 2);
  }, [pages, searchParams]);

  return (
    <section className={styles['product-list']}>
      <div className={styles['product-list__controls']}>
        <div
          className={`${styles['product-list__control']} ${styles[`product-list__control--long`]}`}
        >
          <p
            style={{ fontSize: '12px', fontWeight: '700', lineHeight: '100%' }}
          >
            Sort by
          </p>
          <Dropdown
            options={optionsForSort}
            setValues={setFilterValues}
            value={filterValues}
          />
        </div>
        <div
          className={`${styles['product-list__control']} ${styles[`product-list__control--short`]}`}
        >
          <p
            style={{ fontSize: '12px', fontWeight: '700', lineHeight: '100%' }}
          >
            Items on page
          </p>
          <Dropdown
            options={optionsItemsPerPage}
            setValues={setItemsPerPage}
            value={itemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <div className={styles['product-list__content']}>
        <ProductGrid products={visibleProducts} />

        {itemsPerPage !== 'all' && (
          <div className={styles['product-list__pagination']}>
            <ButtonWithIcon
              rotate={180}
              onClick={() => {
                setCurrentPage(p => Math.max(p - 1, 1));
              }}
              disabled={currentPage === 1}
            />

            <div className={styles['product-list__pagination-buttons']}>
              <ButtonWithIcon
                iconName="number"
                value={pages[0]}
                onClick={() => {
                  setCurrentPage(pages[0]);
                }}
                className={
                  pages[0] === +currentPage ? 'button__number--selected' : ''
                }
              />

              {+currentPage >= 4 && (
                <ButtonWithIcon iconName="else" value={'...'} disabled={true} />
              )}

              {finalPages.map((page, index) => {
                return (
                  <ButtonWithIcon
                    iconName="number"
                    value={page}
                    onClick={() => setCurrentPage(page)}
                    className={
                      page === +currentPage ? 'button__number--selected' : ''
                    }
                    key={index}
                  />
                );
              })}
            </div>

            <ButtonWithIcon
              onClick={() => {
                setCurrentPage(p => Math.min(p + 1, pages.length));
              }}
              disabled={currentPage === pages.length}
            />
          </div>
        )}
      </div>
    </section>
  );
};
