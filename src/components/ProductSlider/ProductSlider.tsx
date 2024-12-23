import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

type Props = {
  title: string;
};

export const ProductSlider: React.FC<Props> = ({ title }) => {
  return (
    <section className="productSlider">
      <div className="productSlider__header">
        <h2>{title}</h2>
        <div className="productSlider__navigation">
          <button className="productSlider__prev" id={'slidePrev'}></button>
          <button className="productSlider__next" id={'slideNext'}></button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, EffectCreative]}
        slidesPerView={1}
        navigation={{
          nextEl: '#slideNext',
          prevEl: '#slidePrev',
        }}
        loop={true}
        effect="creative"
        creativeEffect={{
          prev: {
            opacity: 0,
            translate: ['-100%', 0, 0],
          },
          next: {
            opacity: 0,
            translate: ['100%', 0, 0],
          },
        }}
      >
        <SwiperSlide>
          <h1>2</h1>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};
