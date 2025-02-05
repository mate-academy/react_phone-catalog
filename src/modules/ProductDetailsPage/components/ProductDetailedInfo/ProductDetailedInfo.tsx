import { Product } from '../../../shared/types/types';
import { ProductDetails } from '../../types';
import { About } from '../About';
import { PhotosSlider } from '../PhotosSlider';
import { ProductDetailsControls } from '../ProductDetailsControls';
import { TechSpecs } from '../TechSpecs';
import styles from './ProductDetailedInfo.module.scss';

type Props = {
  productDetails: ProductDetails;
  product: Product;
};

export const ProductDetailedInfo: React.FC<Props> = ({
  productDetails,
  product,
}) => {
  const { name, category, images } = productDetails;

  return (
    <section className={styles.ProductDetailedInfo}>
      <h1 className={styles.Title}>{name}</h1>

      <PhotosSlider
        photos={images}
        productCategory={category}
        className={styles.PhotosSlider}
      />

      <ProductDetailsControls
        productDetails={productDetails}
        product={product}
        className={styles.Controls}
      />

      <About product={productDetails} className={styles.About} />
      <TechSpecs product={productDetails} className={styles.TechSpecs} />
    </section>
  );
};
