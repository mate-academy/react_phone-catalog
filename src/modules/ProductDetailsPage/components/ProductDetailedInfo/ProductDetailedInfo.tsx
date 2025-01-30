import { ProductDetails } from '../../../shared/types/types';
import { About } from '../About';
import { PhotosSlider } from '../PhotosSlider';
import { ProductDetailsControls } from '../ProductDetailsControls';
import { TechSpecs } from '../TechSpecs';
import styles from './ProductDetailedInfo.module.scss';

type Props = {
  productDetails: ProductDetails;
  fullPrice: number;
  price: number;
};

export const ProductDetailedInfo: React.FC<Props> = ({
  productDetails,
  fullPrice,
  price,
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
        product={productDetails}
        fullPrice={fullPrice}
        price={price}
        className={styles.Controls}
      />

      <About product={productDetails} className={styles.About} />
      <TechSpecs product={productDetails} className={styles.TechSpecs} />
    </section>
  );
};
