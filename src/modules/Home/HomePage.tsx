/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import './HomePage.scss';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { NavLink, useNavigate } from 'react-router-dom';
import { Phone } from '../../interface/Phone';

export const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [clickOnButton, setClickOnButton] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [phones, setPhones] = useState<Phone[]>([]);
  const navigate = useNavigate();
  const images = [
    '../../public/img/Banner.png',
    '../../public/img/banner2.jpg',
    '../../public/img/banner3.jpg',
  ];

  useEffect(() => {
    if (!clickOnButton) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1,
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [clickOnButton]);

  useEffect(() => {
    fetch('/public/api/phones.json')
      .then(response => response.json())
      .then(data => {
        setPhones(data);
      });
  }, []);

  const handlePrevClick = () => {
    setClickOnButton(true);
    setIsImageVisible(false);
    setTimeout(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1,
      );
      setIsImageVisible(true);
    }, 1000);

    setTimeout(() => {
      setClickOnButton(false);
    }, 3000);
  };

  const handleNextClick = () => {
    setClickOnButton(true);
    setIsImageVisible(false);
    setTimeout(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
      setIsImageVisible(true);
    }, 1000);

    setTimeout(() => {
      setClickOnButton(false);
    }, 3000);
  };

  return (
    <>
      <div className="main">
        <div className="home">
          <h2 className="home__gargets-store">
            Welcome to Nice Gadgets store!
          </h2>
          <section className="home__turn-image">
            <button className="home__button-left" onClick={handlePrevClick}>
              {'<'}
            </button>
            <img
              src={images[currentImageIndex]}
              className={classNames('home__roundabout', {
                visible: isImageVisible,
              })}
              alt="gadgets-banner"
            />
            <button className="home__button-right" onClick={handleNextClick}>
              {'>'}
            </button>

            <div className="home__turn-line">
              <hr
                className={classNames('small-line', {
                  active: currentImageIndex === 0,
                })}
                onClick={() => {
                  setTimeout(() => {
                    setClickOnButton(false);
                  }, 3000);
                  setCurrentImageIndex(0);
                }}
              />
              <hr
                className={classNames('small-line', {
                  active: currentImageIndex === 1,
                })}
                onClick={() => {
                  setClickOnButton(true);
                  setTimeout(() => {
                    setClickOnButton(false);
                  }, 3000);
                  setCurrentImageIndex(1);
                }}
              />
              <hr
                className={classNames('small-line', {
                  active: currentImageIndex === 2,
                })}
                onClick={() => {
                  setTimeout(() => {
                    setClickOnButton(false);
                  }, 3000);
                  setCurrentImageIndex(2);
                }}
              />
            </div>
          </section>

          <div className="swiper">
            <div className="swiper__top-bar">
              <h2 className="swiper__brand-h2">Brand new models</h2>
              <div className="swiper__nav-buttons">
                <div className="swiper-button-prev" />
                <div className="swiper-button-next" />
              </div>
            </div>
            <div className="swiper__phone">
              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
                className="swiper__slide"
              >
                {phones.map((phone, index) => (
                  <SwiperSlide key={index} className="swiper__card">
                    <img
                      src={phone.images[0]}
                      alt={phone.name}
                      className="swiper__image-phone"
                      onClick={() => {
                        const productId = phone.id;

                        navigate(`/phones/${productId}`, { state: phone });
                      }}
                    />
                    <h4 className="swiper__name">{phone.name}</h4>
                    <h3 className="swiper__costs">${phone.priceRegular}</h3>
                    <div className="swiper__small-line" />
                    <div className="swiper__position">
                      <h5 className="swiper__screen">Screen</h5>
                      <h5 className="swiper__oled">{phone.screen}</h5>
                    </div>
                    <div className="swiper__position">
                      <h5 className="swiper__capacity">Capacity</h5>
                      <h5 className="swiper_gb">{phone.capacity}</h5>
                    </div>
                    <div className="swiper__position">
                      <h5 className="swiper__ram">RAM</h5>
                      <h5 className="swiper__ram-gb">{phone.ram}</h5>
                    </div>
                    <div className="swiper__position">
                      <NavLink to="/" className="swiper__add-to-cart">
                        Add to cart
                      </NavLink>
                      <button className="swiper__button-like">
                        <NavLink to="/" className="swiper__like"></NavLink>
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <section className="home__category">
            <h2 className="home__category-h2">Shop by category</h2>

            <div className="home__category-phone">
              <img
                src="../../public/img/phoneCategory.png"
                alt="logo-gadgets"
                className="home__category-img"
                onClick={() => {
                  navigate('/phones');
                }}
              />
              <h3 className="home__category-h3">Mobile phones</h3>
              <h4 className="home__category-h4">95 models</h4>
            </div>

            <div className="home__category-tablet">
              <img
                src="../../public/img/tabletsCategory.png"
                alt="logo-gadgets"
                className="home__category-img"
                onClick={() => {
                  navigate('/tablets');
                }}
              />
              <h3 className="home__category-h3">Tablets</h3>
              <h4 className="home__category-h4">24 models</h4>
            </div>

            <div className="home__category-accessuries">
              <img
                src="../../public/img/accessuriesCategory.png"
                alt="logo-gadgets"
                className="home__category-img"
                onClick={() => {
                  navigate('/accessories');
                }}
              />
              <h3 className="home__category-h3">Accessories</h3>
              <h4 className="home__category-h4">100 models</h4>
            </div>
          </section>

          <div className="swiper">
            <div className="swiper__top-bar">
              <h2 className="swiper__brand-h2">Hot prices</h2>
              <div className="swiper__nav-buttons">
                <div className="swiper-button-prev" />
                <div className="swiper-button-next" />
              </div>
            </div>
            <div className="swiper__phone">
              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
                className="swiper__slide"
              >
                {phones.map((phone, index) => (
                  <SwiperSlide key={index} className="swiper__card">
                    <img
                      src={phone.images[0]}
                      alt={phone.name}
                      className="swiper__image-phone"
                      onClick={() => {
                        const productId = phone.id;

                        navigate(`/phones/${productId}`, { state: phone });
                      }}
                    />
                    <h4 className="swiper__name">{phone.name}</h4>
                    <div className="swiper__position">
                      <h3 className="swiper__costs">${phone.priceRegular}</h3>
                      <h3 className="swiper__sale">${phone.priceDiscount}</h3>
                      <div className="swiper__line"></div>
                    </div>
                    <div className="swiper__small-line" />
                    <div className="swiper__position">
                      <h5 className="swiper__screen">Screen</h5>
                      <h5 className="swiper__oled">{phone.screen}</h5>
                    </div>
                    <div className="swiper__position">
                      <h5 className="swiper__capacity">Capacity</h5>
                      <h5 className="swiper_gb">{phone.capacity}</h5>
                    </div>
                    <div className="swiper__position">
                      <h5 className="swiper__ram">RAM</h5>
                      <h5 className="swiper__ram-gb">{phone.ram}</h5>
                    </div>
                    <div className="swiper__position">
                      <NavLink to="/" className="swiper__add-to-cart">
                        Add to cart
                      </NavLink>
                      <button className="swiper__button-like">
                        <NavLink to="/" className="swiper__like"></NavLink>
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
