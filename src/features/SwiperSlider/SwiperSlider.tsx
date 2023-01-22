import { FC } from 'react';
import { Product } from 'src/types/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import {
  ProductCard,
} from '../../pages/ProductsPage/sections/ProductCard/ProductCard';
import './SwiperSlider.scss';

type Props = {
  sectionTitle: string,
  renderedProducts: Product[],
};

export const SwiperSlider: FC<Props> = ({
  sectionTitle,
  renderedProducts,
}) => {
  const [favourites, setFavourites] = useLocalStorage('favourites', '[]');
  const [cartProducts, setCartProducts] = useLocalStorage('cart', '[]');

  const oprions = {
    navigation: true,
    slidesPerGroupAuto: true,
    spaceBetween: 16,
    slidesPerView: 4,
    simulateTouch: false,
    modules: [Navigation],
    breakpoints: {
      350: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 21,
        simulateTouch: false,
      },
      876: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 18,
        simulateTouch: false,
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        simulateTouch: false,
      },
      1250: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 16,
        simulateTouch: false,
      },
    },
  };

  return (
    <div className="slider-section phones-section">
      <div className="hot-prices__title">
        <h1>{sectionTitle}</h1>
      </div>

      <div
        className="slider-section__catalog"
      >
        <Swiper
          {...oprions}
        >
          {renderedProducts.map((renderedProduct) => {
            return (
              <SwiperSlide key={renderedProduct.id}>
                <ProductCard
                  isSlide
                  product={renderedProduct}
                  favourites={favourites}
                  setFavourites={setFavourites}
                  cartProducts={cartProducts}
                  setCartProducts={setCartProducts}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
