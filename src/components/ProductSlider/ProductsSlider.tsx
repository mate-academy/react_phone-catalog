import { Product } from '../../shared/types';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from '../ProductCard';
import classNames from 'classnames';
import { Arrow } from '../Arrow';
import { ArrowDirection } from '../../shared/IconArrow';
import productsSlider from './ProductsSlider.module.scss';
import 'swiper/css';
import { SecondaryButton } from '../SecondaryButton';
import { SliderTitles } from './SliderTitles';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import catalogStyles from '../Сatalog/Catalog.module.scss';
import { Navigation } from 'swiper/modules';

type Props = {
  products: Product[];
  title: SliderTitles;
  isLoading: boolean;
};

export const ProductsSlider = ({ products, title, isLoading }: Props) => {
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="container">
      <section className={productsSlider.productsSlider}>
        <div className={productsSlider.productsSliderHeader}>
          <h2
            className={classNames(
              'font-h2',
              productsSlider.productsSliderTitle,
            )}
          >
            {title}
          </h2>
          <div className={productsSlider.productsSliderButtons}>
            <div
              className={classNames(
                productsSlider.button,
                productsSlider.buttonPrev,
              )}
            >
              <SecondaryButton ref={prevButtonRef}>
                <Arrow direction={ArrowDirection.Left} />
              </SecondaryButton>
            </div>
            <div
              className={classNames(
                productsSlider.button,
                productsSlider.buttonNext,
              )}
            >
              <SecondaryButton ref={nextButtonRef}>
                <Arrow direction={ArrowDirection.Right} />
              </SecondaryButton>
            </div>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          breakpoints={{
            0: {
              slidesPerView: 1.25,
            },
            640: {
              slidesPerView: 2.4,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
          onBeforeInit={swiper => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== 'boolean'
            ) {
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.prevEl = prevButtonRef.current;

              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.nextEl = nextButtonRef.current;
            }
          }}
        >
          {isLoading &&
            products.length === 0 &&
            Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide
                key={index}
                className={catalogStyles.CatalogSkeletonItem}
              >
                <ProductCardSkeleton />
              </SwiperSlide>
            ))}
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};
