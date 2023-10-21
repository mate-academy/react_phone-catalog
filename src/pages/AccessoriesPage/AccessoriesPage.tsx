import { useContext } from 'react';
import { PageContent } from '../../components/PageContent';
import { Category } from '../../types/Category';
import { ProductsContext } from '../../contexts/ProductsContext';

export const AccessoriesPage: React.FC = () => {
  const { products } = useContext(ProductsContext);

  const accessories = products
    .filter(product => product.category === Category.Accessories);

  return (
    <PageContent
      title={Category.Accessories}
      products={accessories}
    />
  );
};
