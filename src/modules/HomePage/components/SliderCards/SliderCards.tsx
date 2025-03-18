import { Link, useParams } from 'react-router-dom';
import './SliderCards.scss';
import { useState } from 'react';
import { SliderCardsProps } from '../../../../constants/common';

export const SliderCards: React.FC<SliderCardsProps> = ({
  products,
  title,
  discountPrice,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesPerView = 4;
  const totalSlides = Math.ceil(products.length / slidesPerView);
  const [shake, setShake] = useState(false);
  const { category } = useParams();

  const prevSlide = () => {
    if (currentIndex === 0) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }
    setCurrentIndex(prevIndex => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    if (currentIndex === totalSlides - 1) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }
    setCurrentIndex(prevIndex => (prevIndex + 1) % totalSlides);
  };

  return (
    <div className="slider-cards">
      <h2 className="section-title">{title}</h2>
      <div className={`slider-cards__container ${shake ? 'shake' : ''}`}>
        <ul
          className="slider-cards__track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((phone, index) => (
            <li className="slider-cards__item" key={index}>
              <article className="product-card">
                <div className="product-card__content">
                  <Link to={`/${category?category:"phones"}/${phone.itemId}`} className="product-card__link">
                    <div className="product-card__photo">
                      <img
                        src={phone.image}
                        alt="Product Image"
                        className="product-card__image"
                      />
                    </div>

                    <h3 className="product-card__title">{phone.name}</h3>

                    <p className="product-card__price">
                      <span>${phone.price}</span>
                      {discountPrice && (
                        <span className="product-card__old-price">
                          ${phone.fullPrice}
                        </span>
                      )}
                    </p>
                  </Link>

                  <div className="product-card__info">
                    <div className="product-card__info-item">
                      <p className="product-card__info-label">Screen</p>
                      <p className="product-card__info-value">{phone.screen}</p>
                    </div>
                    <div className="product-card__info-item">
                      <p className="product-card__info-label">Capacity</p>
                      <p className="product-card__info-value">
                        {phone.capacity}
                      </p>
                    </div>
                    <div className="product-card__info-item">
                      <p className="product-card__info-label">RAM</p>
                      <p className="product-card__info-value">{phone.ram}</p>
                    </div>
                  </div>

                  <div className="product-card__actions">
                    <button className="product-card__add-to-cart">
                      Add to cart
                    </button>
                    <button className="product-card__favorite">
                      <img
                        src="/img/icons/add-to-fovourites.svg"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <div className="slider-cards__buttons">
      <button
          onClick={prevSlide}
          className={`slider-cards__button slider-cards__button--prev ${
            currentIndex === 0 ? 'swiper-button--disabled' : ''
          }`}
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className={`slider-cards__button slider-cards__button--next ${
            currentIndex === totalSlides - 1 ? 'slider-cards__button--disabled' : ''
          }`}
        >
          ❯
        </button>
      </div>
    </div>
  );
};
