/* eslint-disable max-len */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useCart } from '../../Functional/CartContext/CartContext';
import heartLove from '../../../public/figmaLogo/HeartLove.svg';
import activeSvg from '../../../public/figmaLogo/ActiveHeart.svg';
import pageNotFound from '../../../public/img/page-not-found.png';
import 'swiper/css';
import 'swiper/css/navigation';
import './NewBrand.scss';
import { Phone } from '../../Interface';

interface PhoneSliderProps {
  title: string;
  phones: Phone[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  capacity?: string;
  quantity: number;
}

export const PhoneSlider: React.FC<PhoneSliderProps> = ({ title, phones }) => {
  const { addToCart, removeFromCart, toggleFavorite, cart, favorites } =
    useCart();

  const handleCartToggle = (phone: Phone) => {
    const selectedColor = phone.color || 'default';

    const cartItem: CartItem = {
      id: phone.id,
      name: phone.name,
      price: phone.priceDiscount,
      image: `/${phone.images[0]}`,
      color: selectedColor,
      capacity: phone.capacity,
      quantity: 1,
    };

    const isInCart = cart.some(
      item =>
        item.id === phone.id &&
        item.color === phone.color &&
        item.capacity === phone.capacity,
    );

    if (isInCart) {
      removeFromCart(phone.id);
    } else {
      addToCart(cartItem);
    }
  };

  return (
    <section className="section">
      <div className="brand">
        <div className="brand__header">
          <h2 className="brand__title">{title}</h2>
          <div className="brand__nav">
            <button className="brand__nav-btn brand__nav-btn--prev swiper-button-p">
              {'<'}
            </button>
            <button className="brand__nav-btn brand__nav-btn--next swiper-button-n">
              {'>'}
            </button>
          </div>
        </div>

        <div className="brand__container">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-n',
              prevEl: '.swiper-button-p',
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 8 },
              480: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="brand__swiper"
          >
            {phones.map(phone => (
              <SwiperSlide key={phone.id} className="brand__card">
                <Link to={`/products/${phone.id}`}>
                  <img
                    src={phone.images[0]}
                    alt={phone.name}
                    className="brand__card-image"
                    onError={e =>
                      e.currentTarget.setAttribute('src', pageNotFound)
                    }
                  />
                  <h3 className="brand__card-title">{phone.name}</h3>
                  <div className="brand__card-prices">
                    <span className="brand__card-price">
                      ${phone.priceDiscount}
                    </span>
                    {phone.priceRegular > phone.priceDiscount && (
                      <span className="brand__card-old-price">
                        ${phone.priceRegular}
                      </span>
                    )}
                  </div>
                  <div className="brand__card-specs">
                    <div className="brand__card-spec">
                      <span className="brand__card-spec-label">Screen</span>
                      <span className="brand__card-spec-value">
                        {phone.screen}
                      </span>
                    </div>
                    <div className="brand__card-spec">
                      <span className="brand__card-spec-label">Capacity</span>
                      <span className="brand__card-spec-value">
                        {phone.capacity}
                      </span>
                    </div>
                    <div className="brand__card-spec">
                      <span className="brand__card-spec-label">RAM</span>
                      <span className="brand__card-spec-value">
                        {phone.ram}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="brand__card-actions">
                  <button
                    className={`brand__card-btn brand__card-btn--add ${
                      cart.some(
                        item =>
                          item.id === phone.id &&
                          item.color === phone.color &&
                          item.capacity === phone.capacity,
                      )
                        ? 'added'
                        : ''
                    }`}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCartToggle(phone);
                    }}
                  >
                    {cart.some(
                      item =>
                        item.id === phone.id &&
                        item.color === phone.color &&
                        item.capacity === phone.capacity,
                    )
                      ? 'Added'
                      : 'Add to cart'}
                  </button>

                  <button
                    className={`brand__card-btn brand__card-btn--favorite ${
                      favorites.includes(phone.id) ? 'favorite--active' : ''
                    }`}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(phone.id);
                    }}
                  >
                    <img
                      src={favorites.includes(phone.id) ? activeSvg : heartLove}
                      alt="Favorite"
                      className="brand__card-btn-icon"
                    />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
