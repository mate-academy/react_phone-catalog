import brandStyles from './SliderCarts.module.scss';
import { Products } from '../../types/types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useMemo } from 'react';
import Loader from '../Loader';
import ViewCart from '../ViewCart';

interface Props {
  products: [] | Products[];
  title: string;
  loading: boolean;
  isSugested?: boolean;
  isHotPrices?: boolean;
}

const SliderCarts: React.FC<Props> = ({
  products,
  title,
  loading,
  isSugested = false,
  isHotPrices = false,
}) => {
  const hotProducts = products
    .filter(p => p.price < p.fullPrice)
    .filter((p, i, arr) => arr.findIndex(x => x.color === p.color) === i)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  const maxYear = useMemo(() => {
    return Math.max(...products.map(product => product.year));
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return products.filter(product => product.year === maxYear);
  }, [maxYear, products]);

  if (loading) {
    return <Loader />;
  }

  const renderCards = isHotPrices
    ? structuredClone(hotProducts)
    : isSugested
      ? products
      : structuredClone(brandNewProducts);

  return (
    <>
      <div className={brandStyles.brand}>
        <div className={brandStyles.brand__top}>
          <h1 className={brandStyles.brand__title}>{title}</h1>

          <div className={brandStyles.brand__navigation}>
            <button
              className={`${brandStyles.brand__left} ${brandStyles.brand__vectors} navigation-button-prev-2`}
            ></button>
            <button
              className={`${brandStyles.brand__right} ${brandStyles.brand__vectors} navigation-button-next-2`}
            ></button>
          </div>
        </div>

        <Swiper
          spaceBetween={16}
          modules={[Navigation]}
          slidesPerView={'auto'}
          className={brandStyles.brand__swiper}
          navigation={{
            nextEl: '.navigation-button-next-2',
            prevEl: '.navigation-button-prev-2',
          }}
        >
          {renderCards.map(phone => {
            return (
              <SwiperSlide className={brandStyles.brand__card} key={phone.id}>
                <ViewCart
                  gadget={phone}
                  gadgets={phone.category}
                  key={phone.id}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default SliderCarts;
