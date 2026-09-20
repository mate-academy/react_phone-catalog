import { useLocation, useNavigate } from 'react-router-dom';
import { ProductType } from '../../../../shared/types/ProductType';

export const useCapacityChange = (
  product: ProductType | null,
  products: ProductType[],
) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCapacityChange = (newCapacity: string) => {
    if (!product || !newCapacity || newCapacity === product.capacity) {
      return;
    }

    const newProduct = products.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.color === product.color &&
        item.capacity === newCapacity,
    );

    if (newProduct) {
      const pathParts = location.pathname.split('/');

      pathParts[pathParts.length - 1] = newProduct.id;
      const newPathname = pathParts.join('/');

      navigate(newPathname, { replace: true });
    }
  };

  return handleCapacityChange;
};
