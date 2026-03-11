import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAccessories } from '@api/products';
import { Product } from '@/types/Product';
import { ProductCard } from '@components/product/ProductCard/ProductCard';
import { sortProducts } from '@utils/productFilters';
import { SortType } from '@/types/SortType';
import s from './AccessoriesPage.module.scss';
import { Breadcrumbs } from '@components/ui/Breadcrumbs/Breadcrumbs';
import { ProductSkeleton } from '@components/product/ProductSkelet/ProductSkelet';
import { Dropdown } from '@components/ui/Dropdown/Dropdown';
import { usePaginationWithParams } from '@hooks/usePaginationWithParams';
import arrowIcon from '@assets/icons/arrow-right.svg';

export const AccessoriesPage = () => {
  const { t } = useTranslation();
  const [accessories, setAccessories] = useState<Product[]>([]);

  const {
    sortBy,
    itemsOnPage,
    currentPage,
    changeSort,
    changeItems,
    changePage,
  } = usePaginationWithParams({
    basePath: '/accessories',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAccessories = async () => {
      setIsLoading(true);
      try {
        const data = await getAccessories();
        setAccessories(
          data.map((acc) => ({
            ...acc,
            category: 'accessories',
          })),
        );
      } catch (error) {
        console.error('Failed to fetch accessories:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 600);
      }
    };

    loadAccessories();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const sortedAccessories = useMemo(() => {
    return sortProducts(accessories, sortBy);
  }, [accessories, sortBy]);

  const totalPages = Math.ceil(sortedAccessories.length / itemsOnPage);

  const visibleAccessories = useMemo(() => {
    const start = (currentPage - 1) * itemsOnPage;
    const end = start + itemsOnPage;

    return sortedAccessories.slice(start, end);
  }, [sortedAccessories, itemsOnPage, currentPage]);

  const sortOptions = [
    { label: t('catalog.price_low'), value: 'priceLow' },
    { label: t('catalog.price_high'), value: 'priceHigh' },
    { label: t('catalog.age'), value: 'newest' },
    { label: t('catalog.oldest'), value: 'oldest' },
  ];

  const itemsOptions = [
    { label: '12', value: '12' },
    { label: '24', value: '24' },
    { label: '36', value: '36' },
    { label: '48', value: '48' },
  ];

  return (
    <div className={s['accessories-page']}>
      <div className={s['accessories-page__container']}>
        <Breadcrumbs />

        <h1 className={s.title}>{t('nav.accessories')}</h1>

        {!isLoading && (
          <p className={s.modelsCount}>
            {t('categories.models_count', { count: accessories.length })}
          </p>
        )}

        <section className={s['accessories-page__controls']}>
          <div className={s.controls}>
            <div className={s.control}>
              <label className={s.label}>{t('catalog.sort_by')}</label>
              <Dropdown
                options={sortOptions}
                value={sortBy}
                onChange={(value) => {
                  changeSort(value as SortType);
                }}
              />
            </div>

            <div className={s.control}>
              <label className={s.label}>{t('catalog.items_on_page')}</label>
              <Dropdown
                options={itemsOptions}
                value={String(itemsOnPage)}
                onChange={(value) => changeItems(+value)}
              />
            </div>
          </div>
        </section>

        <section className={s['accessories-page__list']}>
          {isLoading ?
            Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : visibleAccessories.map((accessory) => (
              <ProductCard
                key={accessory.id}
                product={accessory}
              />
            ))
          }
        </section>

        {totalPages > 1 && (
          <section className={s['accessories-page__pagination']}>
            <div className={s.pagination}>
              <button
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
                className={`${s.pageButton} ${s.arrow} ${s.arrowLeft}`}
              >
                <img
                  src={arrowIcon}
                  alt="Previous page"
                />
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => changePage(page)}
                    className={`${s.pageButton} ${currentPage === page ? s.active : ''}`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
                className={`${s.pageButton} ${s.arrow}`}
              >
                <img
                  src={arrowIcon}
                  alt="Next page"
                />
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
