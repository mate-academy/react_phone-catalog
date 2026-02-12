/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import './HomePage.scss';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';
import { Gargets } from '../../interface/Gargets';

export const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [clickOnButton, setClickOnButton] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [phones, setPhones] = useState<Gargets[]>([]);
  const { cartItems, favoriteItems, addToCart, addFavorite, removeFavorite } =
    useCart();
  const navigate = useNavigate();

  const images = ['./img/Banner.png', './img/banner2.jpg', './img/banner3.jpg'];

  useEffect(() => {
    if (!clickOnButton) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev =>
          prev === images.length - 1 ? 0 : prev + 1,
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [clickOnButton]);

  useEffect(() => {
    fetch(`./api/phones.json`)
      .then(res => res.json())
      .then(data => setPhones(data));
  }, []);

  const handleImageChange = (index: number) => {
    setClickOnButton(true);
    setIsImageVisible(false);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsImageVisible(true);
    }, 1000);
    setTimeout(() => setClickOnButton(false), 3000);
  };

  const renderSwiper = (title: string, withDiscount = false) => (
    <div className="swiper">
      <div className="swiper__top-bar">
        <h2 className="swiper__brand-h2">{title}</h2>
        <div className="swiper__nav-buttons">
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
        </div>
      </div>
      <div className="swiper__phone">
        <Swiper
          modules={[Navigation, Pagination]}
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
          {phones.map((phone, index) => {
            const isInCart = cartItems.some(item => item.id === phone.id);
            const isLiked = favoriteItems.some(item => item.id === phone.id);

            return (
              <SwiperSlide key={index} className="swiper__card">
                <img
                  src={phone.images[0]}
                  alt={phone.name}
                  className="swiper__image-phone"
                  onClick={() =>
                    navigate(`/phones/${phone.id}`, { state: phone })
                  }
                />
                <h4 className="swiper__name">{phone.name}</h4>
                <div className="swiper__position">
                  <h3 className="swiper__costs">${phone.priceRegular}</h3>
                  {withDiscount && (
                    <h3 className="swiper__sale">${phone.priceDiscount}</h3>
                  )}
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
                  <NavLink
                    to="/"
                    className={classNames('swiper__add-to-cart', {
                      added: isInCart,
                    })}
                    onClick={e => {
                      e.preventDefault();
                      if (!isInCart) {
                        addToCart(phone);
                      }
                    }}
                    style={{ pointerEvents: isInCart ? 'none' : 'auto' }}
                  >
                    {isInCart ? 'Added to cart' : 'Add to cart'}
                  </NavLink>

                  <button
                    className="swiper__button-like"
                    onClick={() =>
                      isLiked ? removeFavorite(phone.id) : addFavorite(phone)
                    }
                  >
                    <span
                      className="swiper__like"
                      style={{
                        backgroundImage: isLiked
                          ? 'url(./img/favorites.png)'
                          : 'url(./img/navbar/like.png)',
                      }}
                    ></span>
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );

  return (
    <div className="main">
      <div className="home">
        <h2 className="home__gargets-store">Welcome to Nice Gadgets store!</h2>

        {/* Image banner */}
        <section className="home__turn-image">
          <button
            className="home__button-left"
            onClick={() =>
              handleImageChange(
                currentImageIndex === 0
                  ? images.length - 1
                  : currentImageIndex - 1,
              )
            }
          >
            {'<'}
          </button>
          <img
            src={images[currentImageIndex]}
            className={classNames('home__roundabout', {
              visible: isImageVisible,
            })}
            alt="gadgets-banner"
          />
          <button
            className="home__button-right"
            onClick={() =>
              handleImageChange((currentImageIndex + 1) % images.length)
            }
          >
            {'>'}
          </button>
          <div className="home__turn-line">
            {images.map((_, i) => (
              <hr
                key={i}
                className={classNames('small-line', {
                  active: currentImageIndex === i,
                })}
                onClick={() => handleImageChange(i)}
              />
            ))}
          </div>
        </section>

        {renderSwiper('Brand new models')}

        <section className="home__category">
          <h2 className="home__category-h2">Shop by category</h2>
          <div
            className="home__category-phone"
            onClick={() => navigate('/phones')}
          >
            <img
              src="./img/phoneCategory.png"
              alt="phones"
              className="home__category-img"
            />
            <h3 className="home__category-h3">Mobile phones</h3>
            <h4 className="home__category-h4">95 models</h4>
          </div>
          <div
            className="home__category-tablet"
            onClick={() => navigate('/tablets')}
          >
            <img
              src="./img/tabletsCategory.png"
              alt="tablets"
              className="home__category-img"
            />
            <h3 className="home__category-h3">Tablets</h3>
            <h4 className="home__category-h4">24 models</h4>
          </div>
          <div
            className="home__category-accessuries"
            onClick={() => navigate('/accessories')}
          >
            <img
              src="./img/accessuriesCategory.png"
              alt="accessories"
              className="home__category-img"
            />
            <h3 className="home__category-h3">Accessories</h3>
            <h4 className="home__category-h4">100 models</h4>
          </div>
        </section>

        {renderSwiper('Hot prices', true)}
      </div>
    </div>
  );
};
