import { Navigate, useParams } from 'react-router-dom';
import { StatesContext } from '../../store/GlobalStateProvider';
import { useContext } from 'react';
// eslint-disable-next-line max-len
import { ProductGrid } from '../../components/ProductGrid/ProductGrid.component';
// eslint-disable-next-line max-len
import { CategoryTitle } from '../../components/CategoryTitle/CategoryTitle.component';
// eslint-disable-next-line max-len
import { NavigationPath } from '../../components/NavigationPath/NavigationPath.component';

export const CatalogPage: React.FC = () => {
  const { category: categoryId } = useParams();
  const { categories, isReady } = useContext(StatesContext);
  const category = categories.find(cat => cat.id === categoryId);

  if (isReady && !category) {
    return <Navigate to="notfound" />;
  }

  if (isReady && category) {
    return (
      <section className="catalog-page">
        <NavigationPath id={category.id} />
        <CategoryTitle
          title={category.title}
          productsCount={category.productsCount}
        />
        <ProductGrid productsArray={category.products} pagination />
      </section>
    );
  } else {
    return 'Loading... Wait a second!';
  }
};
