import { Link, NavLink, useLocation } from 'react-router-dom';
import { CardPhone } from '../../cardPhone';
import cn from 'classnames';
import { useEffect } from 'react';

interface FavouritesPageProps {
  likeItems: CardPhone[];
  setLikeItems: (value: (prevItems: CardPhone[]) => CardPhone[]) => void;
  addCartItems: (a: CardPhone) => void;
  cartItems: CardPhone[];
  totalItems: number;
}

export const FavouritesPage = ({
  likeItems,
  setLikeItems,
  addCartItems,
  cartItems,
  totalItems,
}: FavouritesPageProps) => {
  const deleteFavoritesItem = (item: CardPhone) => {
    setLikeItems(prevLikeItems => {
      const updateLikeItems = prevLikeItems.filter(
        phone => phone.id !== item.id,
      );

      localStorage.setItem('favourites', JSON.stringify(updateLikeItems));

      return updateLikeItems;
    });
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <>
      <header className="header">
        <div className="header__navlist">
          <div className="header--logo"></div>
          <ul className="header__list">
            <li className="header__item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'header__active' : 'header__href'
                }
              >
                home
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  isActive ? 'header__active' : 'header__href'
                }
              >
                phones
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  isActive ? 'header__active' : 'header__href'
                }
              >
                tablets
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  isActive ? 'header__active' : 'header__href'
                }
              >
                accessories
              </NavLink>
            </li>
          </ul>
        </div>

        <Link to="/menu">
          <div className="header--menu"></div>
        </Link>

        <div className="header__navigation">
          <NavLink
            to="/favourites"
            className={({ isActive }) => (isActive ? 'header__activenav' : '')}
          >
            <div className="header__navigation--like">
              {likeItems.length !== 0 && (
                <div className="header__navigation--count">
                  <p className="header__navigation--count--style">
                    {likeItems.length}
                  </p>
                </div>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'header__activenav' : '')}
          >
            <div className="header__navigation--bag">
              {cartItems.length !== 0 && (
                <div className="header__navigation--count">
                  <p className="header__navigation--count--style">
                    {totalItems}
                  </p>
                </div>
              )}
            </div>
          </NavLink>
        </div>
      </header>

      <div className="availability">
        <main className="functional">
          <section className="navigate">
            <Link to="/" className="navigate__href">
              <div className="navigate__house"></div>
            </Link>
            <div className="navigate__arrow"></div>
            <p className="navigate__text">Favourites</p>
          </section>

          <h1 className="functional__text">Favourites</h1>
          {likeItems.length > 0 && (
            <p className="functional__models">{likeItems.length} items</p>
          )}
          {likeItems.length === 0 && (
            <p className="functional__empty">Favorites is empty &#128546;</p>
          )}

          <section className="mobiles mobiles__favourites">
            <div className="cardsContainer">
              {likeItems.map(item => {
                const isCart = cartItems.some(phone => phone.id === item.id);

                return (
                  <div key={item.id} className="card mobiles__card">
                    {item.images && item.images.length > 0 && (
                      <Link to={`/phones/${item.id}`} className="card__detail">
                        <img
                          src={item.images[0]}
                          alt="Phone image"
                          className="card__foto"
                        />
                      </Link>
                    )}
                    <h2 className="card__text">{item.name}</h2>
                    <div className="card__block">
                      <h3 className="card__price">
                        {item.priceDiscount + '$'}
                      </h3>
                      <h3 className="card__fullprice">
                        {item.priceRegular + '$'}
                      </h3>
                    </div>
                    <div className="card__hr"></div>
                    <div className="card__info">
                      <div className="card__info--block">
                        <p className="card__name">Screen</p>
                        <p className="card__data">{item.screen.slice(0, 5)}</p>
                      </div>
                      <div className="card__info--block">
                        <p className="card__name">Capacity</p>
                        <p className="card__data">{item.capacity}</p>
                      </div>
                      <div className="card__info--block">
                        <p className="card__name">RAM</p>
                        <p className="card__data">{item.ram}</p>
                      </div>
                    </div>

                    <div className="card__buttons">
                      <button
                        className={cn(
                          'card__buttons--add mobiles__button--add',
                          { 'card__buttons--active': isCart },
                        )}
                        onClick={() => addCartItems(item)}
                      >
                        {isCart ? 'Added' : 'Add to cart'}
                      </button>
                      <button
                        className={cn('card__buttons--like', {
                          'card__buttons--like--active':
                            likeItems.includes(item),
                        })}
                        onClick={() => deleteFavoritesItem(item)}
                      >
                        <div
                          className={cn('card__buttons--foto', {
                            'card__buttons--foto--active':
                              likeItems.includes(item),
                          })}
                        ></div>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>

      <footer className="footer">
        <div className="footer__block">
          <div className="footer__logo"></div>
          <ul className="footer__list">
            <li className="footer__item">
              <a href="https://github.com/FoReWwEr" className="footer__href">
                Github
              </a>
            </li>
            <li className="footer__item">
              <a href="mailto:ovoo1339@gmail.com" className="footer__href">
                Contacts
              </a>
            </li>
            <li className="footer__item">
              <a href="https://github.com/FoReWwEr" className="footer__href">
                rights
              </a>
            </li>
          </ul>

          <div className="footer__back">
            <a
              className="footer__href footer__href--flex"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <p className="footer__back--text">Back to top</p>
              <button className="footer__back--button">
                <div className="footer__back--image"></div>
              </button>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
