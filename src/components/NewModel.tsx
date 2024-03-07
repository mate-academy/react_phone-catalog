import { useEffect, useState } from 'react';
import cn from 'classnames';
import Arrow from '../img/Slider button right.png';
// import heeart from '../img/favourites.svg'
/* eslint-disable max-len */

interface Phones {
  id: string;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export const NewModel = () => {
  const [getPhone, setGetPhone] = useState<Phones[] | undefined>();
  const [errorMessage, setErrorMessage] = useState('');
  // eslint-disable-next-line max-len
  const url = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        setGetPhone(data);
      } catch (error) {
        setErrorMessage('Error during fetch:');
      }
    };

    fetchData();
  }, []);

  const newPhones = getPhone?.filter((phone) => phone.year === 2019 && phone.capacity === '256GB');

  const [translate, setTranslate] = useState(0);
  const lengthHotPrice = 10;

  const handleHotPriceGo = (side:string) => {
    if (side === 'left' && translate !== 0) {
      setTranslate(translate + 288);
    }

    if (side === 'right' && translate !== -((lengthHotPrice - 4) * 288)) {
      setTranslate(translate - 288);
    }
  };

  useEffect(() => {

  }, [translate]);

  return !errorMessage ? (
    <section className="hot-prices__wrapper">
      <div className="hot-prices__content">
        <div className="hot-prices__header">
          <h3 className="hot-prices__header__title">Brand new models</h3>
          <div className="hot-prices__header__buttons">
            <button
              type="button"
              className={cn(
                'hot-prices__header__buttons__button',
                { 'hot-prices__header__buttons__button__disabled': translate === 0 },
              )}
              onClick={() => handleHotPriceGo('left')}
            >
              <img
                className="hot-prices__header__buttons__button__img--left"
                src={Arrow}
                alt="arrow left"
              />
            </button>
            <button
              type="button"
              className={cn(
                'hot-prices__header__buttons__button',
                { 'hot-prices__header__buttons__button__disabled': translate === -((lengthHotPrice - 4) * 288) },
              )}
              onClick={() => handleHotPriceGo('right')}
            >
              <img
                className="hot-prices__header__buttons__button__img--right"
                src={Arrow}
                alt="arrow right"
              />
            </button>
          </div>
        </div>
        <div className="hot-prices__goods">
          <div className="hot-prices__goods__cards" style={{ transform: `translateX(${translate}px)` }}>
            {!!newPhones && newPhones.map((phone) => (
              <div className="hot-prices__goods__cards__good-card">
                <img
                  src={`https://mate-academy.github.io/react_phone-catalog/_new/${phone.image}`}
                  alt=""
                  className="hot-prices__goods__cards__good-card__img"
                />
                <div className="hot-prices__goods__cards__good-card__header">
                  <h4 className="hot-prices__goods__cards__good-card__header__name">
                    {phone.name}
                  </h4>
                  <div className="hot-prices__goods__cards__good-card__header__prace">
                    <p className="hot-prices__goods__cards__good-card__header__prace__new">
                      {`$${phone.price}`}
                    </p>
                  </div>
                  <div className="hot-prices__goods__cards__good-card__header__line" />
                  <div className="hot-prices__goods__cards__good-card__main">
                    <div className="hot-prices__goods__cards__good-card__main__titles">
                      <h5 className="hot-prices__goods__cards__good-card__main__titles__title">
                        Screen
                      </h5>
                      <h5 className="hot-prices__goods__cards__good-card__main__titles__title">
                        Capacity
                      </h5>
                      <h5 className="hot-prices__goods__cards__good-card__main__titles__title">
                        RAM
                      </h5>
                    </div>
                    <div className="hot-prices__goods__cards__good-card__main__info">
                      <h5 className="hot-prices__goods__cards__good-card__main__info__title">
                        {phone.screen}
                      </h5>
                      <h5 className="hot-prices__goods__cards__good-card__main__info__title">
                        {phone.capacity}
                      </h5>
                      <h5 className="hot-prices__goods__cards__good-card__main__info__title">
                        {phone.ram}
                        {' '}
                      </h5>
                    </div>
                  </div>
                  <div className="hot-prices__goods__cards__good-card__buttons">
                    <button
                      type="button"
                      className="hot-prices__goods__cards__good-card__buttons__cart"
                      tabIndex={0}
                      aria-label="Previous Image"
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      className="hot-prices__goods__cards__good-card__buttons__favorite"
                      tabIndex={0}
                      aria-label="Previous Image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ) : <div />;
};
