import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { requestSpecific } from '../api';
import { CardsSlider } from './CardsSlider';
import { Phone } from './ProductCard';

interface PhoneInfo {
  additionalFeatures: string,
  android: {
    os: string,
    ui: string,
  },
  availability: string[],
  battery: {
    standbyTime: string,
    talkTime: string,
    type: string
  },
  camera: {
    features: string[],
    primary: string
  },
  connectivity: {
    bluetooth: string,
    cell: string,
    gps: boolean,
    infrared: boolean,
    wifi: string
  },
  description: string,
  display: {
    screenResolution: string,
    screenSize: string,
    touchScreen: boolean
  },
  hardware: {
    accelerometer: boolean,
    audioJack: string,
    cpu: string,
    fmRadio: boolean,
    physicalKeyboard: boolean,
    usb: string
  },
  id: string,
  images: string[],
  name: string,
  sizeAndWeight: {
    dimensions: string[],
    weight: string
  },
  storage: {
    flash: string,
    ram: string
  }
}

type Props = {
  allGadgets: Phone[],
  favorite: string[],
  cart: string[],
  gadgetsList: Phone[],
  type: string,
  handleCart: (id: string) => void,
  handleFavorite: (id: string) => void,
};

export const ProductDetailsPage: React.FC<Props> = ({
  allGadgets,
  favorite,
  cart,
  gadgetsList,
  type,
  handleCart,
  handleFavorite,
}) => {
  const [phoneInfo, setPhoneInfo] = useState<PhoneInfo>();
  const [linkForBigPhoto, setLinkForBigPhoto] = useState('');
  const { id } = useParams();
  const phonePrice = gadgetsList.find((phone: Phone) => phone.id === id);
  const navigate = useNavigate();

  const fetchInfo = () => {
    return requestSpecific(id || '');
  };

  useEffect(() => {
    fetchInfo().then((phone: PhoneInfo) => {
      setPhoneInfo(phone);
      setLinkForBigPhoto(phone.images[0]);
    });
  }, [id]);

  const randomGadgets = (initialArray: Phone[]) => {
    const arrayCopy = [...initialArray];
    let currentIndex = arrayCopy.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      arrayCopy[currentIndex] = arrayCopy[randomIndex];
      arrayCopy[randomIndex] = arrayCopy[currentIndex];
    }

    return initialArray;
  };

  return (
    <>
      <div className="product-page__link-container">
        <Link to="/" className="product-page__link" />
        <div className="product-page__arrow" />
        <div className="product-page__title product-details__title">{type}</div>
        <div className="product-page__arrow" />
        <div className="product-page__title">{phoneInfo?.name}</div>
      </div>

      <div className="product-page__link-container">
        <div className="product-page__arrow product-details__arrow--back" />
        <button
          type="button"
          className="product-details__title"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
      <h2 className="section__title product-details__section-title">{phoneInfo?.name}</h2>
      <div className="product-details__top-block-container">

        <div className="product-details__photo-container">
          <ul className="product-details__small-photos-container">
            {phoneInfo?.images.map((image: string) => (
              <li
                key={image}
                className="product-details__small-photo-container"
              >
                <button
                  type="button"
                  className="product-details__small-photo-button"
                  onClick={() => {
                    setLinkForBigPhoto(image);
                  }}
                >
                  <img src={image} alt={phoneInfo.name} className="product-details__small-photo" />
                </button>
              </li>
            ))}
          </ul>

          <div className="product-details__big-photo-container">
            <img
              src={linkForBigPhoto}
              alt={phoneInfo?.name}
              className="product-details__big-photo"
            />
          </div>

          <div className="product-details__price-container">
            <div className="product-card__line" />
            {phonePrice && (
              <div className="product-card__price">
                <div
                  className="product-card__price--discount"
                >
                  {phonePrice.discount !== 0
                    ? `$${Math.floor(phonePrice.price
                      - (phonePrice.price * (phonePrice.discount / 100)))}`
                    : `$${phonePrice.price.toString()}`}
                </div>
                <div
                  hidden={phonePrice.discount === 0}
                  className="product-card__price--initial"
                >
                  {`$${phonePrice.price.toString()}`}
                </div>
              </div>
            )}

            <button type="button" className="product-card__buttons">
              <button
                type="button"
                className={classNames('product-card__buttons--card',
                  { 'in-card': cart.includes(id || '') })}
                onClick={() => {
                  handleCart(id || '');
                }}
              >
                {cart.includes(id || '') ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                type="button"
                className={classNames('product-card__buttons--favorite',
                  { 'in-favorites': favorite.includes(id || '') })}
                onClick={() => {
                  handleFavorite(id || '');
                }}
              >
                { }
              </button>
            </button>

            <div>
              <div className="product-card__description">
                <div className="product-card__description--property">Screen size</div>
                <div className="product-card__description--value">{phoneInfo?.display.screenSize}</div>
              </div>
              <div className="product-card__description">
                <div className="product-card__description--property">Resolution</div>
                <div className="product-card__description--value">{phoneInfo?.display.screenResolution}</div>
              </div>
              <div className="product-card__description">
                <div className="product-card__description--property">RAM</div>
                <div className="product-card__description--value">{phoneInfo?.storage.ram}</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="product-details__description-box">
        <div className="product-details__description-container">
          <h3 className="product-details__description-title">About</h3>
          <div className="product-details__description-line" />
          <p className="product-details__description-text">{phoneInfo?.description}</p>
        </div>

        <div className="product-details__description-container--tech">
          <h3 className="product-details__description-title">Tech specs</h3>
          <div className="product-details__description-line" />

          <div className="product-details__params">
            <div className="product-card__description--property">OS</div>
            <div className="product-card__description--value">{phoneInfo?.android.os}</div>
          </div>
          <div className="product-details__params">
            <div className="product-card__description--property">Battery</div>
            <div className="product-card__description--value">{phoneInfo?.battery.type}</div>
          </div>
          <div className="product-details__params">
            <div className="product-card__description--property">Camera</div>
            <div className="product-card__description--value">{phoneInfo?.camera.primary}</div>
          </div>
          <div className="product-details__params">
            <div className="product-card__description--property">Weight</div>
            <div className="product-card__description--value">{phoneInfo?.sizeAndWeight.weight}</div>
          </div>
        </div>

      </div>

      <CardsSlider
        favorite={favorite}
        cart={cart}
        title="You may also like"
        list={randomGadgets(allGadgets)}
        handleCart={handleCart}
        handleFavorite={handleFavorite}
      />
    </>
  );
};
