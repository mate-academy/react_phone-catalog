import { Swiper, SwiperSlide } from 'swiper/react';
import { Product } from '@/shared/types/Product';
import style from './ProductsSlider.module.scss';
import container from '@/shared/styles/Container.module.scss';
import { Autoplay, Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import { Button } from '../Button';
import { useRef } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { useTranslation } from 'react-i18next';

type Props = {
  products: Product[];
  title: string;
  showRegularPriceOnly?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  showRegularPriceOnly,
}) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const { t } = useTranslation();

  return (
    <section className={style.ProductsSlider}>
      <div className={container.container__ProductsSlider}>
        <div className={style.ProductsSlider__content}>
          <div className={style.wrapper}>
            <div className={style.titleBlock}>
              <h3 className={style.title}> {t(title)}</h3>
            </div>

            <div className={style.buttonsWrapper}>
              <Button ref={prevRef} icon="icons/left.svg" alt="prev" />
              <Button ref={nextRef} icon="icons/right.svg" alt="next" />
            </div>
          </div>

          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            loop={true}
            speed={1000}
            slidesPerView="auto"
            spaceBetween={16}
            onBeforeInit={swiper => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation !== 'boolean'
              ) {
                const navigation = swiper.params.navigation;

                navigation.prevEl = prevRef.current;
                navigation.nextEl = nextRef.current;
              }
            }}
            navigation
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {products.map(product => {
              return (
                <SwiperSlide key={product.id}>
                  <ProductCard
                    product={product}
                    showRegularPriceOnly={showRegularPriceOnly}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
