import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { useTranslation } from 'react-i18next';

import { Good } from '../../types/Good';

import './Slider.scss';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';
import { GoodPrice } from '../GoodPrice/GoodPrice';

type Props = {
  goods: Good[],
  rootClassName: string,
};

export const Slider: React.FC<Props> = React.memo(({
  goods,
  rootClassName,
}) => {
  const [searchParams] = useSearchParams();
  const currentLanguage = searchParams.get('lang') || 'en';

  const { t } = useTranslation();

  return (
    <Swiper
      slidesPerView={1}
      modules={[Pagination]}
      pagination={{ clickable: true }}
    >
      {goods.map(good => {
        const {
          images,
          name,
          id,
          seoUrl,
          translationSlug,
          price,
          sale,
        } = good;

        return (
          <SwiperSlide
            className={`${rootClassName}__goods-list-item`}
            key={id}
          >
            <Link
              className={`${rootClassName}__goods-list-item-link`}
              to={{
                pathname: seoUrl,
                search: `?lang=${currentLanguage}`,
              }}
            >
              <img
                className={`${rootClassName}__goods-list-item-image`}
                src={images[0]}
                alt={name}
              />

              <div className={`${rootClassName}__goods-list-item-info`}>
                <h2 className={`${rootClassName}__goods-list-item-info-header`}>
                  {t(translationSlug)}
                </h2>

                <GoodPrice
                  rootClassName="homePage-list-item-info"
                  sale={sale}
                  price={price}
                />
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
});
