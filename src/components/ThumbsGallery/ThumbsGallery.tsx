import { FC, useState } from 'react';
import './ThumbsGallery.scss';
import './SwipersStyles.scss';
import {
  FreeMode,
  Navigation,
  Thumbs,
  Pagination,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { Swiper as SwiperClass } from 'swiper/types';
import classNames from 'classnames';

type Props = {
  picturesUrl: string[],
  onOpenModal?: (() => void) | null;
};

export const ThumbsGallery: FC<Props> = ({
  picturesUrl,
  onOpenModal,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const handleClick = () => {
    if (onOpenModal) {
      onOpenModal();
    }
  };

  const handleKeyBoardClick = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'Enter' && onOpenModal) {
      onOpenModal();
    }
  };

  return (
    <div className="thumbs-gallery">
      <div className="thumbs-gallery__thumbs">
        <Swiper
          className="thumbsSwiper"
          navigation={{
            prevEl: '.thumbs-button-prev',
            nextEl: '.thumbs-button-next',
          }}
          slidesPerView={5}
          spaceBetween={16}
          direction="vertical"
          modules={[Navigation, Thumbs, FreeMode]}
          onSwiper={setThumbsSwiper}
        >
          <div className="thumbs-button-prev" />

          {picturesUrl.map((pictureUrl, i) => (
            <SwiperSlide
              key={pictureUrl}
            >
              <div
                className="picture-container"
                key={pictureUrl}
                role="button"
                tabIndex={0}
              >
                <img
                  src={`/new/${pictureUrl}`}
                  alt={`Slide ${i}`}
                  className="thumbs-gallery__thumb-picture"
                />
              </div>
            </SwiperSlide>
          ))}

          <div className="thumbs-button-next" />
        </Swiper>

        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          className="mainSwiper"
          modules={[FreeMode, Navigation, Thumbs, Pagination]}
          navigation={{
            prevEl: '.main-button-prev',
            nextEl: '.main-button-next',
          }}
        >
          <div className="main-button-prev" />

          {picturesUrl.map((pictureUrl, i) => (
            <SwiperSlide key={`${pictureUrl}${i + 1}`}>
              <div
                className={classNames(
                  'thumbs-gallery__main-picture',
                  { 'can-open-modal': onOpenModal },
                )}
                key={pictureUrl}
                role="button"
                tabIndex={0}
                onClick={handleClick}
                onKeyDown={handleKeyBoardClick}
              >
                <img
                  src={`/new/${pictureUrl}`}
                  alt={`Main slide ${i}`}
                  className="thumbs-gallery__picture"
                />
              </div>
            </SwiperSlide>
          ))}

          <div className="main-button-next" />
        </Swiper>
      </div>
    </div>
  );
};

ThumbsGallery.defaultProps = {
  onOpenModal: null,
};
