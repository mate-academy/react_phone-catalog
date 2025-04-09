import React from 'react';
import CardItem from '../../../../components/CardItem/CardItem';
import styles from './ProductsSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import { Product } from '../../../../types/products';
import { Mousewheel, Navigation } from 'swiper/modules';
import Arrow from '../../../../components/Icons/Arrow/Arrow';
import { ArrowDirection } from '../../../../types/arrowDirection';
import { useAppSelector } from '../../../../app/hooks';

const ProductsSlider = () => {
  const products = useAppSelector<Product[]>(state => state.store.products);
  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   getProducts().then(response => setProducts(response));
  // }, []);

  return (
    <>
      <div className={styles.navigation}>
        <Arrow
          className={classNames(styles.prev)}
          direction={ArrowDirection.left}
        />
        <Arrow
          className={classNames(styles.next)}
          direction={ArrowDirection.right}
        />
      </div>
      <Swiper
        className={classNames(styles.swiper)}
        modules={[Navigation, Mousewheel]}
        slidesPerView={4}
        slidesPerGroup={1}
        navigation={{
          nextEl: `.${styles.next}`,
          prevEl: `.${styles.prev}`,
        }}
        // mousewheel={true}
        key={products.length}
      >
        {products.map(product => (
          <SwiperSlide key={product.id} className={styles['swiper-slide']}>
            <CardItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductsSlider;
