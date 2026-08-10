import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCategoryProducts } from '../../../api/products';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import { Pagination } from '../../../components/Pagination';
import { ProductsList } from '../../../components/ProductsList';
import { ProductsSkeleton } from '../../../components/ProductsSkeleton';
import { TranslationKey, useLanguage } from '../../../context/LanguageContext';
import { Product, ProductCategory } from '../../../types/Product';
import styles from './CatalogPage.module.scss';

type SortOption = 'age' | 'title' | 'price';
type PerPageOption = '4' | '8' | '16' | 'all';

interface Props {
  category: ProductCategory;
}

interface CategoryTranslationKeys {
  breadcrumb: TranslationKey;
  title: TranslationKey;
  empty: TranslationKey;
  noMatches: TranslationKey;
}

type CategoryTranslationMap = Record<ProductCategory, CategoryTranslationKeys>;

const categoryTranslationKeys: CategoryTranslationMap = {
  phones: {
    breadcrumb: 'nav.phones',
    title: 'catalog.phonesTitle',
    empty: 'catalog.phonesEmpty',
    noMatches: 'catalog.phonesNoMatches',
  },
  tablets: {
    breadcrumb: 'nav.tablets',
    title: 'catalog.tabletsTitle',
    empty: 'catalog.tabletsEmpty',
    noMatches: 'catalog.tabletsNoMatches',
  },
  accessories: {
    breadcrumb: 'nav.accessories',
    title: 'catalog.accessoriesTitle',
    empty: 'catalog.accessoriesEmpty',
    noMatches: 'catalog.accessoriesNoMatches',
  },
};

const isSortOption = (value: string | null): value is SortOption =>
  value === 'age' || value === 'title' || value === 'price';

const isPerPageOption = (value: string | null): value is PerPageOption =>
  value === '4' || value === '8' || value === '16' || value === 'all';

const getPageFromParams = (value: string | null) => {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
};

export const CatalogPage: React.FC<Props> = ({ category }) => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const translationKeys = categoryTranslationKeys[category];
  const sortOptions: DropdownOption[] = [
    { value: 'age', label: t('catalog.newest') },
    { value: 'title', label: t('catalog.alphabetically') },
    { value: 'price', label: t('catalog.cheapest') },
  ];
  const perPageOptions: DropdownOption[] = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: 'all', label: t('catalog.all') },
  ];

  const sortParam = searchParams.get('sort');
  const perPageParam = searchParams.get('perPage');
  const query = (searchParams.get('query') ?? '').trim().toLowerCase();
  const sortBy: SortOption = isSortOption(sortParam) ? sortParam : 'age';
  const perPage: PerPageOption = isPerPageOption(perPageParam)
    ? perPageParam
    : 'all';
  const requestedPage = getPageFromParams(searchParams.get('page'));

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setHasError(false);

    getCategoryProducts(category)
      .then(data => {
        if (!isCancelled) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [category, reloadKey]);

  const filteredProducts = useMemo(
    () =>
      products.filter(product => product.name.toLowerCase().includes(query)),
    [products, query],
  );

  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    if (sortBy === 'title') {
      return result.sort((productA, productB) =>
        productA.name.localeCompare(productB.name),
      );
    }

    if (sortBy === 'price') {
      return result.sort(
        (productA, productB) => productA.price - productB.price,
      );
    }

    return result.sort((productA, productB) => productB.year - productA.year);
  }, [filteredProducts, sortBy]);

  const productsPerPage =
    perPage === 'all' ? filteredProducts.length : Number(perPage);
  const totalPages =
    perPage === 'all' || filteredProducts.length === 0
      ? 1
      : Math.ceil(filteredProducts.length / productsPerPage);
  const currentPage = Math.min(requestedPage, totalPages);
  const firstProductIndex = (currentPage - 1) * productsPerPage;
  const lastProductIndex = currentPage * productsPerPage;
  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(firstProductIndex, lastProductIndex);

  useEffect(() => {
    if (isLoading || requestedPage === currentPage) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);

    if (currentPage === 1) {
      nextParams.delete('page');
    } else {
      nextParams.set('page', String(currentPage));
    }

    setSearchParams(nextParams, { replace: true });
  }, [currentPage, isLoading, requestedPage, searchParams, setSearchParams]);

  const handleSortChange = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set('sort', value);
    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const handlePerPageChange = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value === 'all') {
      nextParams.delete('perPage');
    } else {
      nextParams.set('perPage', value);
    }

    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const handlePageChange = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);

    if (page === 1) {
      nextParams.delete('page');
    } else {
      nextParams.set('page', String(page));
    }

    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.catalogPage}>
      <div className="container">
        <Breadcrumbs currentPage={t(translationKeys.breadcrumb)} />

        <h1 className={styles.title}>{t(translationKeys.title)}</h1>
        <p className={styles.count}>
          {t('catalog.models', { count: filteredProducts.length })}
        </p>

        {isLoading && (
          <div className={styles.products}>
            <ProductsSkeleton />
          </div>
        )}

        {!isLoading && hasError && (
          <div className={styles.messageBlock}>
            <p>{t('common.somethingWrong')}</p>
            <button type="button" onClick={() => setReloadKey(key => key + 1)}>
              {t('common.reload')}
            </button>
          </div>
        )}

        {!isLoading && !hasError && products.length === 0 && (
          <div className={styles.messageBlock}>
            <p>{t(translationKeys.empty)}</p>
          </div>
        )}

        {!isLoading && !hasError && products.length > 0 && (
          <>
            <div className={styles.controls}>
              <Dropdown
                id={`${category}-sort`}
                label={t('catalog.sortBy')}
                value={sortBy}
                options={sortOptions}
                onChange={handleSortChange}
                className={styles.sortControl}
              />

              <Dropdown
                id={`${category}-per-page`}
                label={t('catalog.itemsOnPage')}
                value={perPage}
                options={perPageOptions}
                onChange={handlePerPageChange}
                className={styles.perPageControl}
              />
            </div>

            {filteredProducts.length === 0 ? (
              <div className={styles.messageBlock}>
                <p>{t(translationKeys.noMatches)}</p>
              </div>
            ) : (
              <>
                <div className={styles.products}>
                  <ProductsList products={visibleProducts} />
                </div>

                {perPage !== 'all' && totalPages > 1 && (
                  <div className={styles.pagination}>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
