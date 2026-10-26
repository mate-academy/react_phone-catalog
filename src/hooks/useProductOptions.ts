import { ProductDetails } from 'src/types/Types';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from 'src/context/StoreContext';

const normalizeColor = (color: string) => {
  return color.toLowerCase().replaceAll(' ', '').replaceAll('-', '');
};

export const useProductOptions = () => {
  const { productByCategory } = useStoreContext();
  const navigate = useNavigate();

  const findProductByOptions = (
    currentProduct: ProductDetails,
    options: {
      color: string;
      capacity: string;
    },
  ) => {
    return productByCategory[
      currentProduct.category as keyof typeof productByCategory
    ].find(
      product =>
        product.namespaceId === currentProduct.namespaceId &&
        product.capacity === options.capacity &&
        normalizeColor(product.color) === normalizeColor(options.color),
    );
  };

  const handleProductChange = (
    currentProduct: ProductDetails,
    options: {
      color?: string;
      capacity?: string;
    },
  ) => {
    const color = options.color ?? currentProduct.color;
    const capacity = options.capacity ?? currentProduct.capacity;

    const foundProduct = findProductByOptions(currentProduct, {
      color,
      capacity,
    });

    if (foundProduct) {
      navigate(`/${foundProduct.category}/${foundProduct.id}`);
    }
  };

  return handleProductChange;
};
