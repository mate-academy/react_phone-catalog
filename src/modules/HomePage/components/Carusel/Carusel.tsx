import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import banner1 from '../../../../../public/img/banner-main.png';
import banner2 from '../../../../../public/img/iphone-17.jpg';
import banner4 from '../../../../../public/img/banner-phones.png';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './swiper.scss';
import { useEffect, useRef } from 'react';

const photo = [banner1, banner1, banner1, banner2, , banner4];

// const data = [
//   {
//     id: 'apple-watch-series-3-38mm-space-gray',
//     category: 'accessories',
//     namespaceId: 'apple-watch-series-3',
//     name: 'Apple Watch Series 3 38mm Space Gray',
//     capacityAvailable: ['38mm', '42mm'],
//     capacity: '38mm',
//     priceRegular: 199,
//     priceDiscount: 169,
//     colorsAvailable: ['space gray', 'silver', 'gold'],
//     color: 'space gray',
//     images: [
//       'img/accessories/apple-watch-series-3/space-gray/00.webp',
//       'img/accessories/apple-watch-series-3/space-gray/01.webp',
//       'img/accessories/apple-watch-series-3/space-gray/02.webp',
//     ],
//     description: [
//       {
//         title: 'Monitor your health',
//         text: ['12'],
//       },
//       {
//         title: 'Stay connected on the go',
//         text: ['12'],
//       },
//       {
//         title: 'Stream your favorite music',
//         text: ['12'],
//       },
//     ],
//     screen: "1.3' OLED",
//     resolution: '272x340',
//     processor: 'Apple S3',
//     ram: '768MB',
//     cell: ['Wi-Fi', 'Bluetooth', 'LTE'],
//   },
//   {
//     id: 'apple-watch-series-3-42mm-space-gray',
//     category: 'accessories',
//     namespaceId: 'apple-watch-series-3',
//     name: 'Apple Watch Series 3 42mm Space Gray',
//     capacityAvailable: ['38mm', '42mm'],
//     capacity: '42mm',
//     priceRegular: 250,
//     priceDiscount: 219,
//     colorsAvailable: ['space gray', 'silver', 'gold'],
//     color: 'space gray',
//     images: [
//       'img/accessories/apple-watch-series-3/space-gray/00.webp',
//       'img/accessories/apple-watch-series-3/space-gray/01.webp',
//       'img/accessories/apple-watch-series-3/space-gray/02.webp',
//     ],
//     description: [
//       {
//         title: 'Monitor your health',
//         text: ['12'],
//       },
//       {
//         title: 'Stay connected on the go',
//         text: ['12'],
//       },
//       {
//         title: 'Stream your favorite music',
//         text: ['12'],
//       },
//     ],
//     screen: "1.3' OLED",
//     resolution: '272x340',
//     processor: 'Apple S3',
//     ram: '768MB',
//     cell: ['Wi-Fi', 'Bluetooth', 'LTE'],
//   },
//   {
//     id: 'apple-watch-series-3-38mm-gold',
//     category: 'accessories',
//     namespaceId: 'apple-watch-series-3',
//     name: 'Apple Watch Series 3 38mm Gold',
//     capacityAvailable: ['38mm', '42mm'],
//     capacity: '38mm',
//     priceRegular: 199,
//     priceDiscount: 169,
//     colorsAvailable: ['space gray', 'silver', 'gold'],
//     color: 'gold',
//     images: [
//       'img/accessories/apple-watch-series-3/gold/00.webp',
//       'img/accessories/apple-watch-series-3/gold/01.webp',
//       'img/accessories/apple-watch-series-3/gold/02.webp',
//     ],
//     description: [
//       {
//         title: 'Monitor your health',
//         text: ['12'],
//       },
//       {
//         title: 'Stay connected on the go',
//         text: ['12'],
//       },
//       {
//         title: 'Stream your favorite music',
//         text: ['12'],
//       },
//     ],
//     screen: "1.3' OLED",
//     resolution: '272x340',
//     processor: 'Apple S3',
//     ram: '768MB',
//     cell: ['Wi-Fi', 'Bluetooth', 'LTE'],
//   },
//   {
//     id: 'apple-watch-series-3-42mm-gold',
//     category: 'accessories',
//     namespaceId: 'apple-watch-series-3',
//     name: 'Apple Watch Series 3 42mm Gold',
//     capacityAvailable: ['38mm', '42mm'],
//     capacity: '42mm',
//     priceRegular: 250,
//     priceDiscount: 219,
//     colorsAvailable: ['space gray', 'silver', 'gold'],
//     color: 'gold',
//     images: [
//       'img/accessories/apple-watch-series-3/gold/00.webp',
//       'img/accessories/apple-watch-series-3/gold/01.webp',
//       'img/accessories/apple-watch-series-3/gold/02.webp',
//     ],
//     description: [
//       {
//         title: 'Monitor your health',
//         text: ['12'],
//       },
//       {
//         title: 'Stay connected on the go',
//         text: ['12'],
//       },
//       {
//         title: 'Stream your favorite music',
//         text: ['12'],
//       },
//     ],
//     screen: "1.3' OLED",
//     resolution: '272x340',
//     processor: 'Apple S3',
//     ram: '768MB',
//     cell: ['Wi-Fi', 'Bluetooth', 'LTE'],
//   },
// ];

export const Carusel = () => {
  const swiperWrapperRef = useRef<HTMLDivElement | null>(null);

  function adjustMargin() {
    const screenWidth = window.innerWidth;

    if (swiperWrapperRef.current) {
      swiperWrapperRef.current.style.marginLeft =
        screenWidth <= 520
          ? '0px'
          : screenWidth <= 650
            ? '-50px'
            : screenWidth <= 800
              ? '-100px'
              : '-150px';
    }
  }

  useEffect(() => {
    adjustMargin();
    window.addEventListener('resize', adjustMargin);

    return () => window.removeEventListener('resize', adjustMargin);
  }, []);

  return (
    // wrapper arrow

    <>
      <div className="main-swiper">
        <div className="main-container">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
            }}
            grabCursor
            loop={true}
            centeredSlides
            slidesPerView={'auto'}
            autoplay={{ delay: 222000, disableOnInteraction: false }}
            slideToClickedSlide
            breakpoints={{
              320: { spaceBetween: 40 },
              650: { spaceBetween: 30 },
              1000: { spaceBetween: 20 },
            }}
            
            onSwiper={swiper => {
              swiperWrapperRef.current = swiper.wrapperEl as HTMLDivElement;
            }}
          >
            {photo.map((s, i) => (
              <SwiperSlide key={i}>
                <img className="img__slider" src={s} alt="p" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
