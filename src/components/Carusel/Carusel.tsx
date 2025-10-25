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
};

export const Carusel: React.FC<Props> = ({ data }) => {
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.header}>
          <h2 className={`title-section ${style.title}`}>Brand new models</h2>
          <div className={styleArrow.arrows}>
            <button type="button" className={styleArrow.arrow__next}>
              <span className={styleArrow.arrow__left}></span>
            </button>
            <button type="button" className={styleArrow.arrow__prev}>
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
        >
          {data.map(item => (
            <SwiperSlide key={item.id}>
              <Card item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
