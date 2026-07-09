import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getProducts } from '../../api/products';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CategoryControls } from '../../components/CategoryControls';
import { ProductCard } from '../../components/ProductCard';
import { Product, ProductCategory } from '../../types/Product';

import styles from './CategoryPage.module.scss';

const categoryTitles: Record<ProductCategory, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const breadcrumbTitles: Record<ProductCategory, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const getCategoryFromPathname = (pathname: string): ProductCategory => {
  return pathname.slice(1) as ProductCategory;
};

export const CategoryPage = () => {
  const { pathname } = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [itemsPerPage, setItemsPerPage] = useState('16');

  const category = getCategoryFromPathname(pathname);
  const title = categoryTitles[category];

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const categoryProducts = useMemo(() => {
    return products.filter(product => product.category === category);
  }, [products, category]);

  const sortedProducts = useMemo(() => {
    const productsToSort = [...categoryProducts];

    switch (sortBy) {
      case 'alphabetically':
        return productsToSort.sort((productA, productB) =>
          productA.name.localeCompare(productB.name),
        );

      case 'cheapest':
        return productsToSort.sort(
          (productA, productB) => productA.price - productB.price,
        );

      case 'newest':
      default:
        return productsToSort.sort(
          (productA, productB) => productB.year - productA.year,
        );
    }
  }, [categoryProducts, sortBy]);

  const visibleProducts = useMemo(() => {
    if (itemsPerPage === 'all') {
      return sortedProducts;
    }

    return sortedProducts.slice(0, Number(itemsPerPage));
  }, [sortedProducts, itemsPerPage]);

  return (
    <section className={styles.categoryPage}>
      <Breadcrumbs currentPage={breadcrumbTitles[category]} />

      <h1 className={styles.title}>{title}</h1>

      <p className={styles.count}>{categoryProducts.length} models</p>

      <CategoryControls
        sortBy={sortBy}
        itemsPerPage={itemsPerPage}
        onSortChange={setSortBy}
        onItemsPerPageChange={setItemsPerPage}
      />

      <div className={styles.productsGrid}>
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
