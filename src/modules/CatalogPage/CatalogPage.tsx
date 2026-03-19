import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '@/types/Product';
import { getProducts } from '@/api/api';
import { ProductList } from '@/modules/shared/components/ProductList';
import { Heading } from '@/components/ui/Heading';
import { Loader } from '@/components/Loader';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import styles from './CatalogPage.module.scss';

const categoryNames: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(data => {
        const filtered = data.filter(p => p.category === category);

        setProducts(filtered);
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err))
      .finally(() => {
        setTimeout(() => setIsLoading(false), 300);
      });
  }, [category]);

  const displayTitle = category
    ? categoryNames[category] ||
      category.charAt(0).toUpperCase() + category.slice(1)
    : 'Catalog';

  return (
    <section className={styles.catalog}>
      <div className={styles.catalog__container}>
        <Breadcrumbs category={displayTitle} />

        <Heading as="h1"> {displayTitle}</Heading>
        <p className={styles.catalog__count}>{products.length} models</p>

        {/* Filter */}

        {isLoading ? <Loader /> : <ProductList products={products} />}
      </div>
    </section>
  );
};
