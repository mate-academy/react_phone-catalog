import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from '../../components-cp/Breadcrumbs/Breadcrumbs';
import { PageHeader } from '../../components-cp/PageHeader/PageHeader';
import { Filters } from '../../components-cp/Filters/Filters';
import { ProductsGrid } from '../../components-cp/ProductsGrid/ProductsGrid';
import { useSearchParams } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import styles from './PhonesPage.module.scss';

interface ProductType {
  id: number;
  itemId: string;
  category: string;
  name: string;
  image: string;
  price: number;
  fullPrice: number;
  capacity?: string;
  ram?: string;
  year: number;
  screen?: string;
}

interface PhonesPageProps {
  theme: 'light' | 'dark';
}

export const PhonesPage: React.FC<PhonesPageProps> = ({ theme }) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [error, setError] = useState(false);

  // Состояние сортировки
  const [sortField, setSortField] = useState<'age' | 'title' | 'price'>(
    (searchParams.get('sort') as 'age' | 'title' | 'price') || 'age',
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(
    (searchParams.get('direction') as 'asc' | 'desc') || 'desc',
  );

  const perPageParam = searchParams.get('perPage');
  const visibleCount =
    perPageParam === 'all' ? 'all' : Number(perPageParam) || 16;

  useEffect(() => {
    fetch('api/products.json')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
      })
      .then((data: ProductType[]) => {
        const phones = data.filter(p => p.category === 'phones');

        setProducts(phones);
        setError(false);
      })
      .catch(() => setError(true));
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    let comparison = 0;

    if (sortField === 'title') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'price') {
      comparison = a.price - b.price;
    } else if (sortField === 'age') {
      comparison = b.year - a.year;
    }

    return sortDirection === 'asc' ? -comparison : comparison;
  });

  if (error) {
    return <ErrorMessage onRetry={() => window.location.reload()} />;
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs
        theme={theme}
        currentPage="phones"
        currentPageLink="/phones"
      />
      <PageHeader
        title={t('phonesPage.title')}
        subtitle={t('phonesPage.modelsCount', { count: products.length })}
      />
      <Filters
        visibleCount={visibleCount}
        setVisibleCount={() => {}}
        setSortField={setSortField}
        setSortDirection={setSortDirection}
      />
      <ProductsGrid
        products={sortedProducts.map(p => ({
          id: p.id.toString(),
          originalId: p.itemId,
          image: p.image || '/img/placeholder.png',
          title: p.name || 'No title',
          price: p.price ?? 0,
          oldPrice: p.fullPrice ?? undefined,
          specs: {
            screen: p.screen ?? '-',
            capacity: p.capacity ?? '-',
            ram: p.ram ?? '-',
          },
        }))}
        visibleCount={visibleCount}
      />
    </div>
  );
};
