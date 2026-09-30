import { useLocation } from 'react-router-dom';
import { Product } from '../context/CartContext';
import productsData from '../../public/api/products.json';

const products = productsData as Product[];

export const useActiveCategory = () => {
  const location = useLocation();
  const productMatch = location.pathname.match(/^\/products\/([^/]+)/);
  const currentProductId = productMatch ? productMatch[1] : null;

  if (!currentProductId) {
    return null;
  }

  const foundProduct = products.find(
    item => item.itemId === currentProductId || item.id === currentProductId,
  );

  return foundProduct?.category || null;
};
