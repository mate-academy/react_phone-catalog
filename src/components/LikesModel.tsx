import { useEffect, useState } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import Arrow from '../img/Slider button right.png';
import { Phones, useAppContext } from './Context';
import filledFavoriteImage from '../img/favourites-filled.svg';
/* eslint-disable */
// import heeart from '../img/favourites.svg'
/* eslint-disable max-len */

export const LikesModel = () => {
  const { getPhone, setGetPhone } = useAppContext();
  const [errorMessage, setErrorMessage] = useState('');
  const { selectedProduct, setSelectedProduct } = useAppContext();
  const { prevFavoriteArr, setPrevFavoriteArr } = useAppContext();
  const { prevCartPhonesArr, setPrevCartPhonesArr } = useAppContext();
  const { favoritePhones, setFavoritePhones } = useAppContext();
  const { cartPhones, setCartPhones } = useAppContext();
  const { price, setPrice } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const priceRange = 0.3;

  // eslint-disable-next-line max-len
  const url = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        setGetPhone(data);
        setLoading(false);
        const selectedPhone = data?.find((phone: Phones) => phone.phoneId === selectedProduct);
        setMinPrice(selectedPhone.price * (1 - priceRange));
        setMaxPrice(selectedPhone.price * (1 + priceRange));
      } catch (error) {
        setErrorMessage('Error during fetch:');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const newPhones = getPhone?.filter((phone) => phone.price >= minPrice && phone.price <= maxPrice);
  const [translate, setTranslate] = useState(0);
  const lengthHotPrice = newPhones?.length || 0;

  const handleHotPriceGo = (side:string) => {
    if (lengthHotPrice) {
      if (side === 'left' && translate !== 0) {
        setTranslate(translate + 288);
      }
  
      if (side === 'right' && translate !== -((lengthHotPrice - 4) * 288)) {
        setTranslate(translate - 288);
      }
    }
  };

  useEffect(() => {

  }, [translate]);

  useEffect(() => {
    if(prevCartPhonesArr) {
      localStorage.setItem('savedCartName',  JSON.stringify(prevCartPhonesArr));
    }
  }, [prevCartPhonesArr]);

  useEffect(() => {
    const savedValue = localStorage.getItem('savedCartName');
    if (savedValue) {
      setPrevCartPhonesArr(JSON.parse(savedValue));
    }
  }, []);

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

  const { setUrlState } = useAppContext();

  const handlePhones = () => {
    setUrlState("phones");
  };

  return !errorMessage ? (
    <>
    {loading && (
      <div className="clockLoader__wrapper">
        <ClockLoader size={40} loading={loading} className="clockLoader__content"/>
      </div>
    )}
    {!loading &&
      <section className="hot-prices__wrapper">
      <div className="hot-prices__content">
        <div className="hot-prices__header">
          <h3 className="hot-prices__header__title">You may also like</h3>
          {newPhones && newPhones.length > 4 && 
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
          }
        </div>
        <div className="hot-prices__goods">
          <div className="hot-prices__goods__cards" style={{ transform: `translateX(${translate}px)` }}>
          {!!newPhones && newPhones.map((phone) => (
              <div className="hot-prices__goods__cards__good-card">
                {/* <p>{phone.itemId}</p> */}
                <NavLink
                  to={`/phones/${phone.itemId}`}
                  onClick={() => {setSelectedProduct(phone.itemId), handlePhones()}}
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
    </section>}
    </>
  ) : <div />;
};
