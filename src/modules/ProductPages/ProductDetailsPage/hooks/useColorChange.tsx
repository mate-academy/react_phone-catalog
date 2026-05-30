import { useLocation, useNavigate } from 'react-router-dom';
import { ProductType } from '../../../../shared/types/ProductType';
import { normalizeColorForUrl } from '../utils/normalizeColorForUrl';

export const useColorChange = (
  product: ProductType | null,
  products: ProductType[],
  capacityActive: string,
) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleColorChange = (newColor: string) => {
    if (!product || !newColor || newColor === product.color) {
      return;
    }

    const newProduct = products.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.color === newColor &&
        item.capacity === capacityActive,
    );

    if (newProduct) {
      const oldColorSlug = normalizeColorForUrl(product.color);
      const newColorSlug = normalizeColorForUrl(newProduct.color);

      const newPathname = location.pathname.replace(
        new RegExp(`-${oldColorSlug}$`),
        `-${newColorSlug}`,
      );

      navigate(newPathname, { replace: true });
    }
  };

  return handleColorChange;
};
