import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState, useEffect } from 'react';

export const TopSlider = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="w-full flex items-center justify-center px-0 sm:px-[10px] mb-[28px]">
      <div className="relative aspect-square sm:aspect-[2/1] w-full min-w-[320px] max-w-[1040px] min-h-[320px] max-h-[432px] mx-0 sm:mx-[60px]">
        <button
          className="swiper-button-prev-custom absolute -left-15 top-1/2 -translate-y-1/2 h-full max-h-[432px] w-[32px] items-center justify-center border border-arrow-border-active dark:border-dark-arrow-border-active hover:border-primary dark:hover:border-purple transition z-10 text-3xl hidden sm:flex cursor-pointer text-arrow-active dark:text-dark-arrow-active"
          disabled={isLoading}
        >
          {isLoading ? <Skeleton height="100%" /> : '‹'}
        </button>

        <button
          className="swiper-button-next-custom absolute -right-15 top-1/2 -translate-y-1/2 h-full max-h-[432px] w-[32px] items-center justify-center border border-arrow-border-active dark:border-dark-arrow-border-active hover:border-primary dark:hover:border-purple transition z-10 text-3xl hidden sm:flex cursor-pointer text-arrow-active dark:text-dark-arrow-active"
          disabled={isLoading}
        >
          {isLoading ? <Skeleton height="100%" /> : '›'}
        </button>

        <div className="w-full h-full">
          {isLoading ? (
            <Skeleton height="100%" />
          ) : (
            <SwiperReact
              modules={[Navigation, Pagination, Autoplay]}
              loop
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination-custom',
                bulletClass:
                  'bg-gray-500 dark:bg-gray-400 opacity-70 w-[14px] h-[4px] ml-[14px] transition-colors transition-transform duration-200 cursor-pointer',
                bulletActiveClass:
                  '!bg-black dark:!bg-white !opacity-100 !scale-110',
              }}
              className="overflow-hidden h-full"
            >
              <SwiperSlide>
                <div className="w-full h-full flex border-1 border-gray-300 dark:border-dark-elements bg-neutral-50 dark:bg-dark-hover items-center justify-center text-3xl">
                  <img
                    className="w-full h-full object-center object-cover"
                    src="./img/main-banner.png"
                    alt="slide-1"
                  />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="w-full h-full flex border-1 border-elements dark:border-dark-elements bg-hover dark:bg-dark-hover items-center justify-center text-3xl">
                  <img
                    className="w-full h-full object-center object-cover"
                    src="./img/banner-ph.png"
                    alt="slide-1"
                  />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="w-full h-full flex border-1 border-elements dark:border-dark-elements bg-hover dark:bg-dark-hover items-center justify-center text-3xl">
                  <img
                    className="w-full h-full object-center object-cover"
                    src="./img/banner-tab-2.png"
                    alt="slide-2"
                  />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="w-full h-full flex border-1 border-elements dark:border-dark-elements bg-hover dark:bg-dark-hover items-center justify-center text-3xl">
                  <img
                    className="w-full h-full object-center object-cover"
                    src="./img/banner-acc.png"
                    alt="slide-3"
                  />
                </div>
              </SwiperSlide>
            </SwiperReact>
          )}
        </div>

        <div className="swiper-pagination-custom flex justify-center gap-2 mt-3" />

        {isLoading && (
          <div className="flex justify-center items-center gap-6 h-0 ml-[14px]">
            <Skeleton
              width={14}
              height={4}
            />
            <Skeleton
              width={14}
              height={4}
            />
            <Skeleton
              width={14}
              height={4}
            />
            <Skeleton
              width={14}
              height={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};
