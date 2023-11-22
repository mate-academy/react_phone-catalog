import { useContext } from 'react';
import { PageContent } from '../../components/PageContent';
import { Category } from '../../types/Category';
import { ProductsContext } from '../../contexts/ProductsContext';

export const PhonesPage: React.FC = () => {
  const { products } = useContext(ProductsContext);

  const phones = products
    .filter(product => product.category === Category.Phones);

  return (
    <PageContent
      title={Category.Phones}
      products={phones}
    />
  );
};
