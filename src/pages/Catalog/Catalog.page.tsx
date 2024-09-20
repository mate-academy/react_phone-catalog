import { Navigate, useParams } from 'react-router-dom';
// eslint-disable-next-line max-len
import { ProductGrid } from '../../components/ProductGrid/ProductGrid.component';
// eslint-disable-next-line max-len
import { CategoryTitle } from '../../components/CategoryTitle/CategoryTitle.component';
// eslint-disable-next-line max-len
import { NavigationPath } from '../../components/NavigationPath/NavigationPath.component';
import { StatesContext } from '../../store/GlobalStateProvider';
import { useContext, useEffect, useState } from 'react';
import { getCategoryByCatId } from '../../api/products';
import { Category } from '../../types/Category';

export const CatalogPage: React.FC = () => {
  const { category: categoryId } = useParams();
  const { products } = useContext(StatesContext);
  const [category, setCategory] = useState<Category>();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (categoryId) {
      getCategoryByCatId(categoryId)
        .then(cat => {
          setCategory(cat);
        })
        .finally(() => setIsReady(true));
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
          productsCount={category.products?.length}
        />
        <ProductGrid productsArray={category.products} pagination />
      </section>
    );
  } else {
    return 'Loading... Wait a second!';
  }
};
