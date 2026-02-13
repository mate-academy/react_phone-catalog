import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import style from './carusel.module.scss';
import styleArrow from './Arrow.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Products } from 'src/types/products';
import { Card } from '../Card/Cards';
// import { Card } from '../Card/Cards';

type Props = {
  data: Products[];
  title: string;
  type?: string;
};

export const Carusel: React.FC<Props> = ({ data, title, type }) => {
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.header}>
          <h2 className={`title-section ${style.title}`}>{title}</h2>
          <div className={styleArrow.arrows}>
            <button type="button" className={styleArrow.arrow__prev}>
              <span className={styleArrow.arrow__left}></span>
            </button>
            <button type="button" className={styleArrow.arrow__next}>
              <span className={styleArrow.arrow__right}></span>
            </button>
          </div>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          modules={[Navigation]}
          navigation={{
            nextEl: `.${styleArrow.arrow__next}`,
            prevEl: `.${styleArrow.arrow__prev}`,
            disabledClass: `${styleArrow.arrow__disabled}`,
          }}
          className="mySwiper"
          breakpoints={{
            639: {
              slidesPerView: 2,
            },
            1023: {
              slidesPerView: 3,
            },

            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {data.map(item => (
            <SwiperSlide key={item.id}>
              <Card type={type} item={item} title={title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
