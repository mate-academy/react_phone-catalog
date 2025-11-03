import { colorStyle } from '../../../../ProductsContext/TabsContext';
import { useProduct } from '../../../shared/hooks/ProductContext';
import styles from './ProductName.module.scss';

export const ProductName = () => {
  const { product, activeColor, activeCapacity, setActiveImage } = useProduct();

  let productName = product.name;

  if (activeCapacity && product.capacity) {
    productName = productName.replace(product.capacity, activeCapacity);
  }

  const productColorKey = Object.keys(colorStyle).find(
    key => colorStyle[key] === activeColor,
  );

  let productColor = productColorKey;

  if (productColorKey) {
    productColor = productColorKey.replace(/\b\w/g, (char: string) =>
      char.toUpperCase(),
    );
  }

  if (productColor) {
    productName = productName.replace(
      new RegExp(product.color, 'i'),
      productColor,
    );

    const newColor =
      product.color.split(' ').length > 1
        ? product.color.replace(/\s+/g, '-')
        : product.color;

    const newProductColorKey =
      productColorKey && productColorKey?.split(' ').length > 1
        ? productColorKey.replaceAll(' ', '')
        : productColorKey;

    const newImage = product.image.replace(
      new RegExp(`/${newColor}/`, 'i'),
      `/${newProductColorKey}/`,
    );

    setActiveImage(newImage);
  }

  return <div className={styles.title}>{productName}</div>;
};
