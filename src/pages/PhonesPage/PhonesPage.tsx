import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getPhones } from '@api/products';
import { Product } from '@/types/Product';
import { ProductCard } from '@components/product/ProductCard/ProductCard';
import { sortProducts } from '@utils/productFilters';
import { SortType } from '@/types/SortType';
import s from './PhonesPage.module.scss';
import { Breadcrumbs } from '@components/ui/Breadcrumbs/Breadcrumbs';
import { ProductSkeleton } from '@components/product/ProductSkelet/ProductSkelet';
import { Dropdown } from '@components/ui/Dropdown/Dropdown';
import { usePagination } from '@hooks/usePagination';
import { usePaginationWithParams } from '@hooks/usePaginationWithParams';
import arrowRight from '@assets/icons/arrow-right.svg';

export const PhonesPage = () => {
  const { t } = useTranslation();
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    sortBy,
    itemsOnPage,
    currentPage,
    changeSort,
    changeItems,
    changePage,
  } = usePaginationWithParams({
    basePath: '/phones',
  });

  useEffect(() => {
    const loadPhones = async () => {
      setIsLoading(true);
      try {
        const data = await getPhones();
        setPhones(data.map((phone) => ({ ...phone, category: 'phones' })));
      } catch (error) {
        console.error('Failed to fetch phones:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 600);
      }
    };

    loadPhones();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const sortedPhones = useMemo(() => {
    return sortProducts(phones, sortBy);
  }, [phones, sortBy]);

  const totalPages = Math.ceil(sortedPhones.length / itemsOnPage);

  const paginationPages = usePagination(currentPage, totalPages);

  const visiblePhones = useMemo(() => {
    const start = (currentPage - 1) * itemsOnPage;
    const end = start + itemsOnPage;

    return sortedPhones.slice(start, end);
  }, [sortedPhones, itemsOnPage, currentPage]);

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
    <div className={s['phones-page']}>
      <div className={s['phones-page__container']}>
        <Breadcrumbs />

        <h1 className={s.title}>{t('categories.phones', 'Mobile phones')}</h1>

        {!isLoading && (
          <p className={s.modelsCount}>
            {t('categories.models_count', { count: phones.length })}
          </p>
        )}

        <section className={s['phones-page__controls']}>
          <div className={s.controls}>
            <div className={s.control}>
              <label className={s.label}>{t('catalog.sort_by')}</label>
              <Dropdown
                options={sortOptions}
                value={sortBy}
                onChange={(value) => changeSort(value as SortType)}
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

        <section className={s['phones-page__list']}>
          {isLoading ?
            Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : visiblePhones.map((phone) => (
              <ProductCard
                key={phone.id}
                product={phone}
              />
            ))
          }
        </section>

        {totalPages > 1 && (
          <section className={s['phones-page__pagination']}>
            <div className={s.pagination}>
              <button
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
                className={`${s.pageButton} ${s.arrow} ${s.arrowLeft}`}
              >
                <img
                  src={arrowRight}
                  alt="Previous page"
                />
              </button>

              {paginationPages.map((page: number | string, index: number) => {
                if (page === '...') {
                  return (
                    <span
                      key={`dots-${index}`}
                      className={s.dots}
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    onClick={() => changePage(page as number)}
                    className={`${s.pageButton} ${
                      currentPage === page ? s.active : ''
                    }`}
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
                  src={arrowRight}
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
