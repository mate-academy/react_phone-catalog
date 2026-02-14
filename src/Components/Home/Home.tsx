import { Link } from 'react-router-dom';
import './Home.scss';
import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';

const pageBanners = [
  { image: 'img/banners/Banner.png', link: '/phones' },
  { image: 'https://i.imgur.com/RgR1JJm.png', link: '/tablets' },
  { image: 'img/banners/banner-accessories.png', link: '/accessories' },
];

export const Home: React.FC = () => {
  const [currentwidth, setCurrentWidth] = useState(window.innerWidth);
  const [bannersPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(3 / bannersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="home">
      {+currentwidth > 639 ? (
        <div className="home__wrapper">
          <h1 className="home__title">Welcome to Nice Gadgets store!</h1>

          <div className="home__banner--box">
            <div className="home__slider-button">
              <img src="img/ui-kit/chevron-arrow-left.png" alt="button" />
            </div>

            <Swiper
              navigation={{
                nextEl: '.home__slider-button--right',
                prevEl: '.home__slider-button',
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                el: '.home-banners__pagination',
                clickable: true,
                bulletClass: 'paginate-button',
                bulletActiveClass: 'active-pagination',
              }}
              modules={[Navigation, Autoplay, Pagination]}
              loop={true}
            >
              {pageBanners.map(banner => (
                <SwiperSlide key={banner.image}>
                  <Link to={banner.link}>
                    <img
                      src={banner.image}
                      alt="banner"
                      className="home-banner"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="home__slider-button--right">
              <img src="img/ui-kit/chevron-arrow-left.png" alt="button" />
            </div>
          </div>

          <div className="home-banners__pagination">
            {pageNumbers.map(number => (
              <div key={number} className="paginate-button" />
            ))}
          </div>
        </div>
      ) : (
        <div className="home__wrapper">
          <h1 className="home__title">Welcome to Nice Gadgets store!</h1>

          <Link to="/phones">
            <img
              src="img/banners/mobileBanner-phones.png"
              alt="banner"
              className="home-banner"
            />
          </Link>
        </div>
      )}
    </div>
  );
};
