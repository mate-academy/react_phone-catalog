import React, { useEffect } from 'react';
import { Banner } from './banner';
import { Category } from './categories';
import { ProductCardHome } from '../productCardHome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products';
import { AppDispatch, RootState } from '../../app/store';
import styles from './home.module.scss';
import { Product } from '../../types/Product';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import classNames from 'classnames';
import 'swiper/css';

export const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const allProducts = useSelector((state: RootState) => state.products.items);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const newProduct = shuffleArray(
    [...allProducts].filter(product => product.name.includes('iPhone 14')),
  );

  const sortedProducts = [...allProducts].sort((a, b) => {
    const differenceA = a.fullPrice - a.price;
    const differenceB = b.fullPrice - b.price;

    return differenceB - differenceA;
  });

  const handleProductClick = (selectedProduct: Product) => {
    navigate(`/${selectedProduct.category}/${selectedProduct.itemId}`);
  };

  return (
    <>
      <Banner />
      <section className={classNames(styles.new, 'container')}>
        <div className={styles.new_cont}>
          <h2>Brand new models</h2>
          <div className={styles.new_buttons}>
            <button id="myPrev" className={styles.new_buttonPrev} />
            <button id="myNext" className={styles.new_buttonNext} />
          </div>
        </div>

        <Swiper
          slidesPerView={1.4}
          centeredSlides={false}
          slidesPerGroupSkip={1}
          grabCursor={true}
          keyboard={{
            enabled: true,
          }}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 2.4,
              slidesPerGroup: 1,
              spaceBetween: 16,
            },
            1200: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 16,
            },
          }}
          navigation={{
            nextEl: '#myNext',
            prevEl: '#myPrev',
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {newProduct.slice(0, 10).map(product => (
            <SwiperSlide key={product.itemId}>
              <ProductCardHome
                {...product}
                onClick={() => handleProductClick(product)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <Category />

      <section className={classNames(styles.hot, 'container')}>
        <div className={styles.hot_cont}>
          <h2>Hot prices</h2>
          <div className={styles.hot_buttons}>
            <button id="myPrevHot" className={styles.hot_buttonPrev} />
            <button id="myNextHot" className={styles.hot_buttonNext} />
          </div>
        </div>
        <Swiper
          slidesPerView={1.4}
          centeredSlides={false}
          slidesPerGroupSkip={1}
          grabCursor={true}
          keyboard={{
            enabled: true,
          }}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 2.4,
              slidesPerGroup: 1,
              spaceBetween: 16,
            },
            1200: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 16,
            },
          }}
          navigation={{
            nextEl: '#myNextHot',
            prevEl: '#myPrevHot',
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {sortedProducts.slice(0, 10).map(product => (
            <SwiperSlide key={product.id}>
              <ProductCardHome
                {...product}
                isNew={true}
                onClick={() => handleProductClick(product)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};
