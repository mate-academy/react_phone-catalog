import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import { ProductGrid } from '../../components/ProductGrid/ProductGrid.component';
// eslint-disable-next-line max-len
import { CategoryTitle } from '../../components/CategoryTitle/CategoryTitle.component';
// eslint-disable-next-line max-len
import { NavigationPath } from '../../components/NavigationPath/NavigationPath.component';
import { getCategoryByCatId, getProductsByCatId } from '../../api/products';
import { Category } from '../../types/Category';
import { ProductSummary } from '../../types/ProductSummary';

export const CatalogPage: React.FC = () => {
  const { category: categoryId } = useParams();
  // const { categories } = useContext(StatesContext);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [category, setCategory] = useState<Category>();
  const [products, setProducts] = useState<ProductSummary[]>();

  useEffect(() => {
    if (categoryId) {
      Promise.allSettled([
        getCategoryByCatId(categoryId)
          .then(cat => setCategory(cat))
          .catch(() => 'something wrong while fetching category'),
        getProductsByCatId(categoryId)
          .then(prods => setProducts(prods))
          .catch(() => 'something wrong while fetching products'),
      ]).finally(() => setIsReady(true));
    }
  }, [categoryId]);

  if (isReady && !category) {
    return <Navigate to="notfound" />;
  }

  if (isReady && category && products) {
    return (
      <section className="catalog-page">
        <NavigationPath firstLevel={category.id} />
        <CategoryTitle
          title={category.title}
          productsCount={products?.length}
        />
        <ProductGrid productsArray={products} pagination />
      </section>
    );
  } else {
    return 'Loading... Wait a second!';
  }
};
