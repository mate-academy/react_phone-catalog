import { useContext, useMemo } from 'react';
import styles from './ProductsSlider.module.scss';
import arrowLeft from '../../images/Icons/Arrow-Left.png';
import arrowRight from '../../images/Icons/Arrow-Right.png';
import { ProductsContext } from '../../contexts/products/ProductsStore';
import { ProductCard } from '../ProductCard/ProductCard';
import { prepereProducts, SortBy } from '../../utils/prepereProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

type Props = {
  title: string;
  category: string;
  sortBy: SortBy;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  category,
  sortBy,
}) => {
  const { products } = useContext(ProductsContext);

  const preperedProducts = useMemo(() => {
    return prepereProducts(products, category, sortBy);
  }, [products, category, sortBy]);

  return (
    <div className={styles.productsSlider}>
      <div className={styles.productsSlider__upperBar}>
        <h2 className={styles.productsSlider__title}>{title}</h2>
        <div className={styles.productSlider__buttons}>
          <button className={styles.productsSlider__btnLeft}>
            <img src={arrowLeft} />
          </button>
          <button className={styles.productsSlider__btnRight}>
            <img src={arrowRight} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.${styles.productsSlider__btnLeft}`,
          nextEl: `.${styles.productsSlider__btnRight}`,
        }}
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={16}
        className={styles.productsSlider__slider}
        breakpoints={{
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },

          640: {
            slidesPerView: 2.5,
            slidesPerGroup: 2,
          },

          320: {
            slidesPerView: 1.5,
            slidesPerGroup: 1,
          },
        }}
      >
        {preperedProducts.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
