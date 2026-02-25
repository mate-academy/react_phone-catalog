import { useGetProductDetails } from '../../hooks/useGetProductDetails';

import { ImageSlider } from '../ImageSlider';
import { ProductInteractions } from '../ProductInteractions/ProductInteractions';
import styles from './ProductIllustration.module.scss';

export const ProductIllustration = () => {
  const { product } = useGetProductDetails();
  return (
    <div className={styles.product__illustration}>
      <ImageSlider images={product?.images || []} />

      {product && <ProductInteractions product={product} />}
    </div>
  );
};
