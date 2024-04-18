import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import arrowIcon from '../images/icons/arrow-icon.svg';
import { Device } from '../types/product';
import { useState } from 'react';

const example: Device = {
  id: 'apple-iphone-11-128gb-black',
  category: 'phones',
  namespaceId: 'apple-iphone-11',
  name: 'Apple iPhone 11 128GB Black',
  capacityAvailable: ['64GB', '128GB', '256GB'],
  capacity: '128GB',
  priceRegular: 1100,
  priceDiscount: 1050,
  colorsAvailable: ['black', 'green', 'yellow', 'white', 'purple', 'red'],
  color: 'black',
  images: [
    'img/phones/apple-iphone-11/black/00.webp',
    'img/phones/apple-iphone-11/black/01.webp',
    'img/phones/apple-iphone-11/black/02.webp',
    'img/phones/apple-iphone-11/black/03.webp',
    'img/phones/apple-iphone-11/black/04.webp',
  ],
  description: [
    {
      title: 'And then there was Pro',
      text: [
        `A transformative triple-camera system that adds tons of capability without complexity.`,
        `An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine
        learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful
        enough to be called Pro.`,
      ],
    },
    {
      title: 'Camera',
      text: [
        `Meet the first triple-camera system to combine cutting-edge technology
        with the legendary simplicity of iPhone. Capture up to four times more scene.
        Get beautiful images in drastically lower light. Shoot the highest-quality video
        in a smartphone — then edit with the same tools you love for photos. You’ve never
        shot with anything like it.`,
      ],
    },
    {
      title: `Shoot it. Flip it. Zoom it. Crop it.
         Cut it. Light it. Tweak it. Love it.`,
      text: [
        `iPhone 11 Pro lets you capture videos that are beautifully true to life,
        with greater detail and smoother motion. Epic processing power means it can
        shoot 4K video with extended dynamic range and cinematic video stabilization —
        all at 60 fps. You get more creative control, too, with four times more scene and
         powerful new editing tools to play with.`,
      ],
    },
  ],
  screen: "6.1' IPS",
  resolution: '1792x828',
  processor: 'Apple A13 Bionic',
  ram: '4GB',
  camera: '12 Mp + 12 Mp + 12MP',
  zoom: 'Digital, 5x',
  cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
};

export const InfoProductPage = ({}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  return (
    <main
      className="
        content padding-inline-sm flex w-full flex-col gap-8 pt-6 md:gap-10
      "
    >
      <Breadcrumbs />

      <div>
        <img
          src={arrowIcon}
          alt="Arrow Back"
          className="h-4 min-w-4 -rotate-90"
        />
        <Link to="../">
          <small className="font-bold text-secondary">Back</small>
        </Link>
      </div>

      <h2 className="padding-inline-sm md:px-0">{example.name}</h2>

      <div className="flex flex-col gap-4">
        <Swiper
          className="w-full"
          spaceBetween={10}
          navigation={true}
          slidesPerView={1}
          loop={true}
          grabCursor={true}
          thumbs={{
            swiper: thumbsSwiper,
            thumbsContainerClass: 'border border-primary cursor-pointer',
          }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          // autoplay={{
          //   delay: 5000,
          // }}
        >
          {example.images.map(image => (
            <SwiperSlide className="w-full" key={image}>
              <img
                src={image}
                alt="Phone"
                className="aspect-square w-full object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          className="w-full"
          onSwiper={setThumbsSwiper}
          // loop={true}
          spaceBetween={8}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          // autoplay={{
          //   delay: 2500,
          // }}
          // slideActiveClass='border border-primary cursor-pointer'
          // className="[&>*]:flex [&>*]:flex-col"
          // className="rotate-90 w-20"
        >
          {example.images.map(image => (
            <SwiperSlide
              className="w-full cursor-pointer border border-elements"
              key={image}
            >
              <img
                src={image}
                alt="Phone"
                className="aspect-square w-full object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
};
