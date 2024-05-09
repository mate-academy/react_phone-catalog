import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Link, useParams } from 'react-router-dom';
import './PhonePage.scss';
import { useEffect, useState } from 'react';
import { Phone } from '../../../types/phones';
import { getPhones, getProducts } from '../../../units/api';
import classNames from 'classnames';
import { useSwipe } from '../../../units/useSwipe';
import { Product } from '../../../types/products';
import { scrollOnTop } from '../../../units/functions';

const CARD_WIDTH_WITH_GAP = 288;

const correctColor = (nameColor: string) => {
  switch (nameColor) {
    case 'spacegray':
      return '#4C4C4C';
    case 'midnightgreen':
      return '#5F7170';
    case 'gold':
      return '#FCDBC1';
    case 'purple':
      return '#d2adef';
    case 'midnight':
      return '#4a4a4b';
    case 'rosegold':
      return '#cc8f98';
    case 'green':
      return '#7dd3c5';
    case 'blue':
      return '#277592';

    default:
      return nameColor;
  }
};

export const PhonePage = () => {
  const { phoneId } = useParams();
  const navigate = useNavigate();

  const [currentPhone, setCurrentPhone] = useState<Phone | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  useEffect(() => {
    scrollOnTop();
  }, [phoneId]);

  useEffect(() => {
    getPhones().then(result => {
      const phone = result.find(p => p.id === phoneId);

      setCurrentPhone(phone || null);
      if (phone) {
        setSelectedPhoto(phone.images[0]);
        setSelectedColor(phone.color);
        setSelectedCapacity(phone.capacity);
      }
    });
  }, [phoneId]);

  // ===================
  const handleChangePhoneColor = (currentColor: string) => {
    if (phoneId) {
      const path = phoneId.split('-');

      path[path.length - 1] = currentColor;

      navigate(path.join('-'));
    } else {
      return;
    }
  };

  const handleChangePhoneCapacity = (currentCapacity: string) => {
    if (phoneId) {
      const path = phoneId.split('-');

      path[path.length - 2] = currentCapacity.toLowerCase();

      navigate(path.join('-'));
    }
  };
  // ===================

  const [recommendedPhones, setRecommendedPhones] = useState<Product[]>([]);
  const [transition, setTransition] = useState(0);

  useEffect(() => {
    const lowPointPrice = (currentPhone?.priceRegular || 1000) - 100;
    const highPointPrice = (currentPhone?.priceRegular || 1000) + 100;

    getProducts()
      .then(phones =>
        phones
          .filter(p => p.price < highPointPrice && p.price > lowPointPrice)
          .slice(0, 10),
      )
      .then(setRecommendedPhones);
  }, [currentPhone]);

  const handleSlideLeft = () => {
    setTransition(prev => prev - CARD_WIDTH_WITH_GAP);
  };

  const handleSlideRight = () => {
    setTransition(prev => prev + CARD_WIDTH_WITH_GAP);
  };

  const elementRef = useSwipe(handleSlideLeft, handleSlideRight);

  return (
    <>
      <div className="history-path">
        <Link to="/">
          <div className="icon icon-home" />
        </Link>
        <div className="icon icon-arrow" />
        <Link to="/phones" className="current-page-name">
          Phones
        </Link>
        <div className="icon icon-arrow" />
        <Link to={`/phones/${currentPhone?.id}`} className="current-page-name">
          {currentPhone?.name}
        </Link>
      </div>

      <div className="history-path history-path__back">
        <div className="icon icon-arrow-back" />
        <Link to="/phones" className="current-page-name">
          Back
        </Link>
      </div>

      <h1 className="mobile-phones__phone-name">{currentPhone?.name}</h1>
      <div className="mobile-phones__main-content">
        <div className="gallery__main-photo-container">
          <img
            className="gallery__main-photo"
            src={selectedPhoto || currentPhone?.images[0]}
          />
        </div>

        <div className="gallery__photos-previews">
          {currentPhone?.images.map((image, index) => (
            <img
              className={classNames('gallery__photo', {
                'gallery__photo-selected': image === selectedPhoto,
              })}
              src={image}
              key={index + 1}
              onClick={() => setSelectedPhoto(image)}
            />
          ))}
        </div>

        <div className="mobile-phones__detailed-card detailed-card">
          <div className="detailed-card__available-color">
            <div className="available-color__text">Available colors</div>
            <div className="available-color__buttons">
              {currentPhone?.colorsAvailable.map(color => (
                <button
                  key={color}
                  className={classNames('available-color__button', {
                    'available-color__button-selected': selectedColor === color,
                  })}
                  onClick={() => handleChangePhoneColor(color)}
                >
                  <div
                    className="available-color__button-color"
                    style={{ backgroundColor: correctColor(color) }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="detailed-card__select-capacity">
            <div className="select-capacity__text">Select capacity</div>
            <div className="select-capacity__buttons">
              {currentPhone?.capacityAvailable.map(cap => (
                <button
                  key={cap}
                  className={classNames('select-capacity__button', {
                    'select-capacity__button-selected':
                      selectedCapacity === cap,
                  })}
                  onClick={() => handleChangePhoneCapacity(cap)}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          <div className="detailed-card__to-order">
            <div className="phone-price">
              <div className="phone-price__new-price">{`$${currentPhone?.priceDiscount}`}</div>
              <div className="phone-price__old-price">{`$${currentPhone?.priceRegular}`}</div>
            </div>

            <div className="card__buttons">
              <a href="#" className="button__add">
                Add to card
              </a>
              <a href="#" className="card-button__favourite">
                <img src="./img/icons-image/heart_empty.svg" alt="" />
              </a>
            </div>

            <div className="phone__characteristics">
              <div className="card__discription">
                <span className="discription__title">Screen</span>
                <span className="description__value">
                  {currentPhone?.screen}
                </span>
              </div>

              <div className="card__discription">
                <span className="discription__title">Resolution</span>
                <span className="description__value">
                  {currentPhone?.resolution}
                </span>
              </div>
              <div className="card__discription">
                <span className="discription__title">Processor</span>
                <span className="description__value">
                  {currentPhone?.processor}
                </span>
              </div>
              <div className="card__discription">
                <span className="discription__title">RAM</span>
                <span className="description__value">{currentPhone?.ram}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-phones__secondary-content">
        <div className="mobile-phones__about">
          <div className="about__title">About</div>
          {currentPhone?.description.map(theme => (
            <div key={theme.title} className="about__theme">
              <div className="theme__title">{theme.title}</div>
              <div className="theme__text">
                {theme.text.map(paragraph => (
                  <p key={paragraph} className="theme__paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mobile-phones__tech-specs">
          <div className="tech-specs__title">Tech specs</div>
          <div className="tech-specs__info">
            <div className="card__discription">
              <span className="discription__title">Screen</span>
              <span className="description__value">{currentPhone?.screen}</span>
            </div>

            <div className="card__discription">
              <span className="discription__title">Resolution</span>
              <span className="description__value">
                {currentPhone?.resolution}
              </span>
            </div>

            <div className="card__discription">
              <span className="discription__title">Processor</span>
              <span className="description__value">
                {currentPhone?.processor}
              </span>
            </div>

            <div className="card__discription">
              <span className="discription__title">RAM</span>
              <span className="description__value">{currentPhone?.ram}</span>
            </div>

            <div className="card__discription">
              <span className="discription__title">Built in memory</span>
              <span className="description__value">
                {currentPhone?.capacity}
              </span>
            </div>

            <div className="card__discription">
              <span className="discription__title">Camera</span>
              <span className="description__value">{currentPhone?.camera}</span>
            </div>

            <div className="card__discription">
              <span className="discription__title">Screen</span>
              <span className="description__value">{currentPhone?.screen}</span>
            </div>

            <div className="card__discription">
              <span className="discription__title">Zoom</span>
              <span className="description__value">{currentPhone?.zoom}</span>
            </div>

            <div className="card__discription">
              <span className="discription__title">Cell</span>
              <span className="description__value">
                {currentPhone?.cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="new-models">
        <div className="new-models__head">
          <h2 className="new-models__title">You may also like</h2>
          <div className="new-models__head-buttons">
            <button
              className={classNames(
                'new-models__button-left new-models__button',
                { 'disabled-button__left': transition === 0 },
              )}
              disabled={transition === 0}
              onClick={handleSlideLeft}
            />
            <button
              className={classNames(
                'new-models__button-right new-models__button',
                {
                  'disabled-button__right':
                    transition ===
                    CARD_WIDTH_WITH_GAP * recommendedPhones.length -
                      CARD_WIDTH_WITH_GAP * 2,
                },
              )}
              disabled={
                transition ===
                CARD_WIDTH_WITH_GAP * recommendedPhones.length -
                  CARD_WIDTH_WITH_GAP * 2
              }
              onClick={handleSlideRight}
            />
          </div>
        </div>

        <div className="new-models__window" ref={elementRef}>
          <div
            className="new-models__carousel"
            style={{
              width: `${recommendedPhones.length * CARD_WIDTH_WITH_GAP}px`,
              transform: `translateX(-${transition}px)`,
            }}
          >
            {recommendedPhones.map(phone => {
              const { itemId, image, name, price, screen, capacity, ram } =
                phone;

              return (
                <Link
                  to={`/phones/${itemId}`}
                  key={itemId}
                  className="card-link"
                >
                  <div className="card" key={itemId}>
                    <img className="card__image" src={image} alt={itemId} />

                    <div className="card__title">{name}</div>

                    <div className="card__price">{`$${price}`}</div>

                    <div className="card__characteristics">
                      <div className="card__discription">
                        <span className="discription__title">Screen</span>
                        <span className="description__value">{screen}</span>
                      </div>
                      <div className="card__discription">
                        <span className="discription__title">Capacity</span>
                        <span className="description__value">{capacity}</span>
                      </div>
                      <div className="card__discription">
                        <span className="discription__title">RAM</span>
                        <span className="description__value">{ram}</span>
                      </div>
                    </div>

                    <div className="card__buttons">
                      <button className="button__add">Add to card</button>
                      <button className="card-button__favourite">
                        <img src="./img/icons-image/heart_empty.svg" alt="" />
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
