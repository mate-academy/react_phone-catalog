import { useAppSelector } from './hookStore';
import { useParams, useLocation } from 'react-router-dom';

const useProduct = () => {
  const { pathname } = useLocation();
  const basePath = pathname.split('/')[1];
  const { productId } = useParams();

  const products = useAppSelector(state => {
    switch (basePath) {
      case 'phones':
        return state.phones.phones;
      case 'accessories':
        return state.accessories.accessories;
      case 'tablets':
        return state.tables.tables;
      default:
        return null;
    }
  });

  const product = products?.find(item => item.id === productId);

  return { product };
};

export default useProduct;
