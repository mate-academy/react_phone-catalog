import { useContext } from 'react';
import { PageContent } from '../../components/PageContent';
import { Category } from '../../types/Category';
import { ProductsContext } from '../../contexts/ProductsContext';

export const TabletsPage: React.FC = () => {
  const { products } = useContext(ProductsContext);

  const tablets = products
    .filter(product => product.category === Category.Tablets);

  return (
    <PageContent
      title={Category.Tablets}
      products={tablets}
    />
  );
};
