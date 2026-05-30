import { useParams } from 'react-router-dom';
import { ProductCagetories } from '../../types/ProductCategories';
import { ProductsList } from '../shared/ProductsList';

export const ProductsPage = () => {
  const { productsPage } = useParams();
  const category = productsPage as ProductCagetories;

  return <ProductsList sortBy={category} />;
};
