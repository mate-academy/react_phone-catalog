import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ViewCart from '../ViewCart';
import brandStyles from './YouMayAlsoLike.module.scss';
import getSuggestedProducts from './getSuggestedProducts';

interface Props {
  category: string;
}

const YouMayAlsoLike: React.FC<Props> = ({ category }) => {
  const randomProducts = getSuggestedProducts(category);

  return (
    <>
      <div className={brandStyles.brand__top}>
        <h2 className={brandStyles.brand__title}>You may also like</h2>

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
        {randomProducts.map(phone => {
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
    </>
  );
};

export default YouMayAlsoLike;
