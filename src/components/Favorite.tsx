import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppContext } from './Context';
import HomeWhite from '../img/Home-white.svg';
import filledFavoriteImage from '../img/favourites-filled.svg';
/* eslint-disable */
export const Favorite = () => {
  const { getPhone } = useAppContext();
  const { prevFavoriteArr, setPrevFavoriteArr } = useAppContext();
  const favoriteProducts = getPhone?.filter(
    elem => prevFavoriteArr && prevFavoriteArr.includes(elem.id),
  );
  const { setSelectedProduct } = useAppContext();
  const { prevCartPhonesArr, setPrevCartPhonesArr } = useAppContext();
  const { cartPhones, setCartPhones } = useAppContext();
  const { favoritePhones, setFavoritePhones } = useAppContext();
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const newProductInCart = { id: cartPhones, count: 1, fullPrice: price };

    if (cartPhones.trim() !== '') {
      if (prevCartPhonesArr?.some(elem => elem.id === cartPhones)) {
        setPrevCartPhonesArr(
          prevCartPhonesArr?.filter(
            phone => phone.id !== cartPhones,
          ),
        );
      } else {
        setPrevCartPhonesArr(
          prevCartPhonesArr
            ? [...prevCartPhonesArr, newProductInCart]
            : [newProductInCart],
        );
      }
    }

    setCartPhones('');
    setPrice(0);
  }, [cartPhones, prevCartPhonesArr]);

  useEffect(() => {
    if (favoritePhones.trim() !== '') {
      if (prevFavoriteArr?.includes(favoritePhones)) {
        setPrevFavoriteArr(
          prevFavoriteArr?.filter(
            phone => phone !== favoritePhones,
          ),
        );
      } else {
        setPrevFavoriteArr(
          (prevFavoriteArr
            ? [...prevFavoriteArr, favoritePhones]
            : [favoritePhones]),
        );
      }
    }

    setFavoritePhones('');
  }, [favoritePhones, prevFavoriteArr]);

  return (
    <section className="favorites__wrapper">
      <div className="favorites__content">
        <h2 className="favorites__content__title">Favourites</h2>
        {!prevFavoriteArr || prevFavoriteArr.length === 0 ? (
          <div className="favorites__content__without">
            <h3 className="favorites__content__without__title">
              No favourites yet
            </h3>
            <NavLink to="/" className="phones__header__return-home">
              Return HOME page
              <img
                className="phones__header__return-home__img"
                src={HomeWhite}
                alt="building"
              />
            </NavLink>
          </div>
        ) : (
          <div className="favorites__content__products">
            {favoriteProducts?.map((phone) => (
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
                      className={prevCartPhonesArr && prevCartPhonesArr.some(elem => elem.id === phone.id) ? 'hot-prices__goods__cards__good-card__buttons__cart--added' : 'hot-prices__goods__cards__good-card__buttons__cart'}
                      tabIndex={0}
                      aria-label="Previous Image"
                      onClick={() => {
                        setCartPhones(phone.id),
                        setPrice(phone.fullPrice)}}
                    >
                      {prevCartPhonesArr
                        && prevCartPhonesArr.some(elem => elem.id === phone.id)
                        ? 'Added to cart'
                        : 'Add to cart'}
                    </button>
                    <button
                      type="button"
                      className="hot-prices__goods__cards__good-card__buttons__favorite"
                      style={prevFavoriteArr
                        && prevFavoriteArr.includes(phone.id)
                        ? { backgroundImage: `url(${filledFavoriteImage})` }
                        : undefined}
                      tabIndex={0}
                      aria-label="Previous Image"
                      onClick={() => setFavoritePhones(phone.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
