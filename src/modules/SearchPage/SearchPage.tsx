import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '@/types/Product';
import { getProducts } from '@/api/api';
import { ProductList } from '@/modules/shared/components/ProductList';
import { Heading } from '@/modules/shared/ui/Heading';
import { Skeleton } from '@/components/Skelton';
import { useTranslation } from 'react-i18next';
import styles from './SearchPage.module.scss';
import { EmptyState } from '../shared/components/EmptyState';
import notFoundImg from '@/assets/img/ProductNotFound.png';
import { Pagination } from '../shared/ui/Pagination';

const ITEMS_PER_PAGE = 12;

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  // --- PARAMS ---
  // Extracting search query and current page from the URL
  const query = searchParams.get('query')?.toLowerCase().trim() || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  // --- DATA FETCHING ---
  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(data => {
        setProducts(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // --- SMART FILTERING LOGIC ---
  // Filters products based on name, category, and color.
  // Supports both full phrase matches and individual word matches.
  const filteredProducts = useMemo(() => {
    if (!query) return [];

    const searchTerm = query.toLowerCase().trim();
    const searchWords = searchTerm.split(/\s+/);

    return products.filter(p => {
      const productName = p.name.toLowerCase();
      const productCategory = p.category?.toLowerCase() || '';
      const productColor = p.color?.toLowerCase() || '';

      const fullPhraseMatch =
        productName.includes(searchTerm) ||
        productCategory.includes(searchTerm) ||
        productColor.includes(searchTerm);

      const allWordsMatch = searchWords.every(
        word =>
          productName.includes(word) ||
          productColor.includes(word) ||
          productCategory.includes(word),
      );

      return fullPhraseMatch || allWordsMatch;
    });
  }, [products, query]);

  // --- PAGINATION CALCULATIONS ---
  // Slicing the filtered array to display only the items for the current page
  const visibleProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // --- HANDLERS ---
  const handlePageChange = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', page.toString());

    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- RESET PAGE EFFECT ---
  // Automatically returns to page 1 when the search query changes
  useEffect(() => {
    if (currentPage !== 1 && query !== '') {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('page', '1');
      setSearchParams(nextParams, { replace: true });
    }
  }, [query]);

  return (
    <section className={styles.searchPage}>
      <div className={styles.container}>
        <Heading as="h1" className={styles.title}>
          {t('search.resultsTitle')}
        </Heading>

        {query && !isLoading && (
          <p className={styles.queryInfo}>
            {filteredProducts.length > 0
              ? t('search.resultsCount', {
                  count: filteredProducts.length,
                  query,
                })
              : t('search.resultsFor', { query })}
          </p>
        )}

        {isLoading ? (
          <div className={styles.loaderGrid}>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <ProductList products={visibleProducts} />
            <div className={styles.paginationWrapper}>
              <Pagination
                total={filteredProducts.length}
                perPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <EmptyState
            title={t('search.noResults', { query })}
            text={t('search.tryAgain')}
            imgUrl={notFoundImg}
            showCategories={true}
          />
        )}
      </div>
    </section>
  );
};
