import { useSelector } from 'react-redux';
import { useAppSelector } from './typedHooks';
import {
  getMostExpensiveProduct,
  getProductWithLargestDiscount,
} from '@utils/helpers/sortedByPrice';
import { selectAllProducts } from '@store/selectors';

export const useProducts = () => {
  const products = useAppSelector(state => state.products.products);

  const filteredByQuery = (query: string) =>
    products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );

  const productsWithDetails = useSelector(selectAllProducts);

  const expensiveProduct = getMostExpensiveProduct(products);
  const productWithDiscount = getProductWithLargestDiscount(products);

  return {
    products,
    filteredByQuery,
    expensiveProduct,
    productWithDiscount,
    productsWithDetails,
  };
};
