import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DetailsPhone } from '../../Type/DetailsPhone';
import { getPhone, getPhones } from '../../utils/fetch';
import { BuyButtonCart } from '../BuyButtonCard/BuyButtonCart';
import { FavouritesIcon } from '../FavouritesIcon/FavouritesIcon';
import { HomeIcon } from '../HomeIcon/HomeIcon';
import arrowRight from '../../img/icon/ArrowRight.png';
import './ProductDetals.scss';
import { AlsoLike } from '../AlsoLike/AlsoLike';
import { ProductPhone } from '../../Type/phone';
import { Loader } from '../Loader';

export const ColorPallette: Record<string, string> = {
  rosegold: '#F9D2CD',
  gold: '#F3DBC4',
  silver: '#D9DADB',
  black: '#363539',
  green: '#BEE8D5',
  yellow: '#FEE889',
  white: '#FCF7F4',
  purple: '#CCC2D6',
  red: '#CD283F',
  spacegray: '#4E4D4B',
  midnightgreen: '#5F6960',
  coral: '#FD6A56',
};

export const ProductDetails: React.FC = () => {
  const [isLoading, setiSLoading] = useState(true);
  const [phone, setPhone] = useState<DetailsPhone | null>(null);
  const { idPhone } = useParams <{ idPhone: string }>();
  const [selected, setSelected] = useState(0);
  const [phones, setPhones] = useState <ProductPhone[]>([]);

  useEffect(() => {
    getPhones()
      .then(setPhones)
      .catch()
      .finally();
  }, []);

  useEffect(() => {
    if (idPhone) {
      getPhone(idPhone)
        .then(setPhone)
        .finally(() => setiSLoading(false));
    }
  }, [idPhone, phone]);

  function favouritesPhone() {
    const find = phones.find(currentPhone => currentPhone.phoneId === idPhone);

    if (find !== undefined) {
      return find;
    }

    return null;
  }

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <section className="details">
          <div className="details__title--main">
            <HomeIcon title="Phones" />
            <img className="details__arrow" src={arrowRight} alt="homeIcon" />
            <span className="details__subtitle">{phone?.name}</span>
          </div>
          <h1 className="details__title--name">{phone?.name}</h1>
          <div className="details__container">
            <div className="photos">
              <div className="photos__side">
                {phone?.images.map((image, index) => (
                  <button
                    type="button"
                    key={image}
                    className="photos__buttons"
                    onClick={() => setSelected(index)}
                  >
                    <img
                      src={`_new/${image}`}
                      alt="side_photo"
                      className="photos__sidePhoto"
                    />
                  </button>
                ))}
              </div>
              <div className="photos__main">
                <img
                  className="photos__main__img"
                  src={`_new/${phone?.images[selected]}`}
                  alt="main_photo"
                />
              </div>
            </div>
            <div>
              <div className="params__color">
                <p className="params__color--heading">Available colors</p>

                <div className="colors__list">
                  {phone?.colorsAvailable.map(color => (
                    <div
                      key={color}
                      className="colors__item"
                    >
                      <div className={classNames('colors__border', {
                        'colors__border--selected': color === phone.color,
                      })}
                      >
                        <Link
                          to={`/phones/${phone.namespaceId}-${phone.capacity.toLocaleLowerCase()}-${color}`}
                          className="colors__circle"
                          style={{ backgroundColor: `${ColorPallette[color]}` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="params__capacity">
                <p className="params__capacity--heading">Select capacity</p>
                <div className="capacities__list">
                  {phone?.capacityAvailable.map(capacity => (
                    <Link
                      to={`/phones/${phone.namespaceId}-${capacity.toLocaleLowerCase()}-${phone.color}`}
                      className={classNames('capacities__link', {
                        'capacities__link--selected':
                        capacity === phone.capacity,
                      })}
                      key={capacity}
                    >
                      {capacity}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="ProductCard__price">
                <div className="ProductCard__price-normal">{`$${phone?.priceDiscount}`}</div>
                {phone?.priceDiscount && (
                  <div className="ProductCard__price-discounted">{`$${phone.priceRegular}`}</div>
                )}
              </div>
              <div className="ProductCard__details">
                <div className="ProductCard__buttons">
                  <BuyButtonCart phone={favouritesPhone()} />
                  <FavouritesIcon phone={favouritesPhone()} />
                </div>
                <div className="ProductCard__details-item">
                  <div className="ProductCard__details-item__name">Screen</div>
                  <div className="ProductCard__details-item__value">
                    {phone?.screen || '-'}
                  </div>
                </div>
                <div className="ProductCard__details-item">
                  <div className="ProductCard__details-item__name">
                    Resolution
                  </div>
                  <div className="ProductCard__details-item__value">
                    {phone?.resolution || '-'}
                  </div>
                </div>
                <div className="ProductCard__details-item">
                  <div className="ProductCard__details-item__name">
                    Processor
                  </div>
                  <div className="ProductCard__details-item__value">
                    {phone?.processor || '-'}
                  </div>
                </div>
                <div className="ProductCard__details-item">
                  <div className="ProductCard__details-item__name">RAM</div>
                  <div className="ProductCard__details-item__value">
                    {phone?.ram || '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="details__container">
            <div className="details__about">
              <h2 className="details__about-title">About</h2>
              <h3>{phone?.description[0]?.title}</h3>
              <span className="details__description">
                {phone?.description[0]?.text}
              </span>
              <h3>{phone?.description[1]?.title}</h3>
              <span className="details__description">
                {phone?.description[1]?.text}
              </span>
              <h3>{phone?.description[2]?.title}</h3>
              <span className="details__description">
                {phone?.description[2]?.text}
              </span>
            </div>
            <div className="details__tech">
              <h2 className="details__title">Tech specs</h2>
              <div className="ProductCard__details">
                <div className="ProductCard__details-item">
                  <div className="ProductCard__details-item__name">Screen</div>
                  <div className="ProductCard__details-item__value">
                    {phone?.screen || '-'}
                  </div>
                </div>
                <div className="ProductCard__details-item">
                  <div className="ProductCard__details-item__name">
                    Resolution
                  </div>
                  <div className="ProductCard__details-item__value">
                    {phone?.resolution || '-'}
                  </div>
                </div>
                <div className="ProductCard__details-item">
                  <div className="ProductCard__details-item__name">
                    Processor
                  </div>
                  <div className="ProductCard__details-item__value">
                    {phone?.processor || '-'}
                  </div>
                </div>
                <div className="ProductCard__details-item">
                  <div className="ProductCard__details-item__name">RAM</div>
                  <div className="ProductCard__details-item__value">
                    {phone?.ram || '-'}
                  </div>
                </div>
                <div className="ProductCard__details-item">
                  <div className="ProductCard__details-item__name">
                    Built in memory
                  </div>
                  <div className="ProductCard__details-item__value">
                    {phone?.capacity || '-'}
                  </div>
                </div>
                <div className="ProductCard__details-item">
                  <div className="ProductCard__details-item__name">Camera</div>
                  <div className="ProductCard__details-item__value">
                    {phone?.camera || '-'}
                  </div>
                </div>
                <div className="ProductCard__details-item">
                  <div className="ProductCard__details-item__name">Zoom</div>
                  <div className="ProductCard__details-item__value">
                    {phone?.zoom || '-'}
                  </div>
                </div>
                <div className="ProductCard__details-item">
                  <div className="ProductCard__details-item__name">Cell</div>
                  <div className="ProductCard__details-item__value">
                    {phone?.cell || '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AlsoLike />
        </section>
      )}

    </div>
  );
};
