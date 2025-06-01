import { ProductCard } from '../../../shared/components/ProductCard';
import { Product } from '../../../shared/utils/types/apiTypes';
import styles from './ProductSlider.module.scss';

type Props = {
  products: Product[] | undefined;
  header: string;
};

export const ProductSlider = ({ products, header }: Props) => {
  return (
    <div className={styles.slider}>
      <div className={styles.slider__header}>
        <h1>{header}</h1>
        <div className={styles.slider__buttons}>
          <button className={styles.slider__button}>
            <img src="public/icons/ArrowLeft.svg" alt="" />
          </button>

          <button className={styles.slider__button}>
            <img src="public/icons/ArrowRight.svg" alt="" />
          </button>
        </div>
      </div>
      <div className={styles.slider__products}>
        {products?.map(product => {
          return (
            <ProductCard
              key={product.id}
              name={product.name}
              images={product.image}
              priceDiscount={product.price}
              priceRegular={product.fullPrice}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
            />
          );
        })}
      </div>
    </div>
  );
};
