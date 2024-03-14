import { useEffect, useState } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import Arrow from '../img/Slider button right.png';
import { useAppContext } from './Context';
import filledFavoriteImage from '../img/favourites-filled.svg';
/* eslint-disable */
// import heeart from '../img/favourites.svg'
/* eslint-disable max-len */

export const NewModel = () => {
  const { getPhone, setGetPhone } = useAppContext();
  const [errorMessage, setErrorMessage] = useState('');
  const { setSelectedProduct } = useAppContext();
  const { prevFavoriteArr, setPrevFavoriteArr } = useAppContext();
  const { prevCartPhonesArr, setPrevCartPhonesArr } = useAppContext();
  const { favoritePhones, setFavoritePhones } = useAppContext();
  const { cartPhones, setCartPhones } = useAppContext();
  const [price, setPrice] = useState<number>(0);
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

  useEffect(() => {
    if (favoritePhones.trim() !== '') {
      if (prevFavoriteArr?.includes(favoritePhones)) {
        setPrevFavoriteArr(prevFavoriteArr => prevFavoriteArr?.filter(phone => phone !== favoritePhones));
      } else {
        setPrevFavoriteArr(prevFavoriteArr => (prevFavoriteArr ? [...prevFavoriteArr, favoritePhones] : [favoritePhones]));
      }
    }
    setFavoritePhones(''); 
  }, [favoritePhones, prevFavoriteArr]);

  useEffect(() => {
    const newProductInCart = { id: cartPhones, count: 1, fullPrice: price };
    if (cartPhones.trim() !== "") {
      if (prevCartPhonesArr?.some(elem => elem.id === cartPhones)) {
        setPrevCartPhonesArr(prevCartPhonesArr => prevCartPhonesArr?.filter(phone => phone.id !== cartPhones));
      } else {
        setPrevCartPhonesArr(prevCartPhonesArr => prevCartPhonesArr ? [...prevCartPhonesArr, newProductInCart] : [newProductInCart]);
      }
    }
    setCartPhones('');
    setPrice(0);
}, [cartPhones, prevCartPhonesArr]);

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
                {/* <p>{phone.itemId}</p> */}
                <NavLink
                  to={`/phones/${phone.itemId}`}
                  onClick={() => setSelectedProduct(phone.itemId)}
                >
                  <img
                    src={`https://mate-academy.github.io/react_phone-catalog/_new/${phone.image}`}
                    alt=""
                    className="hot-prices__goods__cards__good-card__img"
                  />
                </NavLink>
                
                <div className="hot-prices__goods__cards__good-card__header">
                  
                  <NavLink
                    to={`/phones/${phone.itemId}`}
                    onClick={() => setSelectedProduct(phone.itemId)}
                    className="hot-prices__goods__cards__good-card__header__name"
                  >
                    {phone.name}
                  </NavLink>
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
                      className={prevCartPhonesArr && prevCartPhonesArr.some(elem => elem.id === phone.itemId) ? 'hot-prices__goods__cards__good-card__buttons__cart--added' : 'hot-prices__goods__cards__good-card__buttons__cart'}
                      tabIndex={0}
                      aria-label="Previous Image"
                      onClick={() => {setCartPhones(phone.itemId), setPrice(phone.price)}}
                    >
                      {prevCartPhonesArr && prevCartPhonesArr.some(elem => elem.id === phone.itemId) ? 'Added to cart' : 'Add to cart'}
                    </button>
                    <button
                      type="button"
                      className="hot-prices__goods__cards__good-card__buttons__favorite"
                      style={prevFavoriteArr && prevFavoriteArr.includes(phone.itemId) ? { backgroundImage: `url(${filledFavoriteImage})` } : undefined}
                      tabIndex={0}
                      aria-label="Previous Image"
                      onClick={() => setFavoritePhones(phone.itemId)}
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
