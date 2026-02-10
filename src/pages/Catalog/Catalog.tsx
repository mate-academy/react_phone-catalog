import { Navigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { Category } from '../../types/Category';
import { getCategoryByCatId, getProductsByCatId } from '../../api/products';
import { Product } from '../../types/Product';
import { NavigationPath } from '../../components/Navigation/Navigation';
import { CategoryTitle } from '../../components/CategoryTitle/CategoryTitle';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';

export const CatalogPage: React.FC = () => {
  const { category: categoryId } = useParams<{ category: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!categoryId) {
      setIsLoading(false);

      return;
    }

    setIsLoading(true);

    Promise.all([
      getProductsByCatId(categoryId),
      getCategoryByCatId(categoryId),
    ])
      .then(([prods, cat]) => {
        setProducts(prods);
        setCategory(cat);
      })
      .catch(() => {
        setCategory(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId]);

  if (isLoading) {
    return <div>Loading... Wait a second!</div>;
  }

  if (!categoryId || !category) {
    return <Navigate to="/notfound" replace />;
  }

  return (
    <section className="catalog-page">
      <NavigationPath firstLevel={category.category_name} />
      <CategoryTitle
        title={`${category.category_name.charAt(0).toUpperCase()}${category.category_name.slice(1)}`}
        productsCount={products.length}
      />
      <ProductGrid productsArray={products} pagination />
    </section>
  );
};
