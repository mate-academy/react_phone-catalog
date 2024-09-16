import { useParams } from 'react-router-dom';
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
  const { categories } = useContext(StatesContext);
  const category = categories.find(cat => cat.id === categoryId);

  return (
    <section className="catalog-page">
      <NavigationPath category={category!} />
      <CategoryTitle category={category!} />
      <ProductGrid category={category!} pagination />
    </section>
  );
};
