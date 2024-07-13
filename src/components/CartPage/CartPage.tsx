import { Link, NavLink, useLocation } from 'react-router-dom';
import { CardPhone } from '../../cardPhone';
import './CartPage.scss';
import { useEffect, useState } from 'react';

interface CartPageProps {
  likeItems: CardPhone[];
  cartItems: CardPhone[];
  setCartItems: (value: (prevItems: CardPhone[]) => CardPhone[]) => void;
  setCounts: (
    value: (prevCounts: { [key: string]: number }) => { [key: string]: number },
  ) => void;
  counts: { [key: string]: number };
  totalItems: number;
}

export const CartPage = ({
  likeItems,
  cartItems,
  setCartItems,
  setCounts,
  counts,
  totalItems,
}: CartPageProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    const calculatedTotalPrice = cartItems.reduce(
      (accumulator, currentItem) => {
        const count = counts[currentItem.id] || 0;

        return accumulator + currentItem.priceDiscount * count;
      },
      0,
    );

    setTotalPrice(calculatedTotalPrice);
  }, [cartItems, counts]);

  const setCountForCard = (id: string, value: number) => {
    setCounts((prevCounts: { [key: string]: number }) => {
      const updatedCounts = {
        ...prevCounts,
        [id]: value,
      };

      localStorage.setItem('counts', JSON.stringify(updatedCounts));

      return updatedCounts;
    });
  };

  const deleteCartItem = (cart: CardPhone) => {
    setCartItems((prevCartItem: CardPhone[]) => {
      const updateCartItem = prevCartItem.filter(
        (phone: { id: string }) => phone.id !== cart.id,
      );

      localStorage.setItem('cart', JSON.stringify(updateCartItem));

      return updateCartItem;
    });
  };

  const calculateTotalPrice = (item: CardPhone) => {
    if (counts[item.id] && item.priceDiscount) {
      return counts[item.id] * item.priceDiscount;
    }

    return 0;
  };

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
              <div className="navigate__arrow navigate__arrow--white"></div>
            </Link>
            <Link to="/" className="navigate__href">
              <p className="navigate__text navigate__text--white">Back</p>
            </Link>
          </section>

          <h1 className="functional__text">Cart</h1>

          {cartItems.length === 0 && (
            <p className="functional__empty">Cart is empty &#128546;</p>
          )}

          <div className="gridblock">
            <div className="columngrid">
              {cartItems.map(cart => (
                <section className="backpack" key={cart.id}>
                  <div className="backpack__upper">
                    <div
                      className="backpack__upper--back"
                      onClick={() => deleteCartItem(cart)}
                    ></div>
                    <Link to={`/phones/${cart.id}`} className="card__detail">
                      <img
                        src={cart.images[0]}
                        alt="phone"
                        className="backpack__upper--phone"
                      />
                    </Link>
                    <div className="backpack__upper--name">{cart.name}</div>
                  </div>
                  <div className="backpack__lower">
                    <div className="backpack__lower--quantity">
                      <button
                        className="backpack__lower--quantity--button"
                        disabled={counts[cart.id] === 1}
                        onClick={() =>
                          setCountForCard(cart.id, counts[cart.id] - 1)
                        }
                      >
                        <div className="backpack__lower--quantity--minus"></div>
                      </button>
                      <div className="backpack__lower--quantity--count">
                        {counts[cart.id]}
                      </div>
                      <button
                        className="backpack__lower--quantity--button"
                        disabled={counts[cart.id] === 9}
                        onClick={() =>
                          setCountForCard(cart.id, counts[cart.id] + 1)
                        }
                      >
                        <div className="backpack__lower--quantity--plus"></div>
                      </button>
                    </div>

                    <h1 className="backpack__lower--price">
                      ${calculateTotalPrice(cart)}
                    </h1>
                  </div>
                  <div className="backpack__big">
                    {' '}
                    {/* big */}
                    <div
                      className="backpack__upper--back"
                      onClick={() => deleteCartItem(cart)}
                    ></div>
                    <Link to={`/phones/${cart.id}`} className="card__detail">
                      <img
                        src={cart.images[0]}
                        alt="phone"
                        className="backpack__upper--phone"
                      />
                    </Link>
                    <div className="backpack__upper--name">{cart.name}</div>
                    <div className="backpack__lower--quantity">
                      <button
                        className="backpack__lower--quantity--button"
                        disabled={counts[cart.id] === 1}
                        onClick={() =>
                          setCountForCard(cart.id, counts[cart.id] - 1)
                        }
                      >
                        <div className="backpack__lower--quantity--minus"></div>
                      </button>
                      <div className="backpack__lower--quantity--count">
                        {counts[cart.id]}
                      </div>
                      <button
                        className="backpack__lower--quantity--button"
                        disabled={counts[cart.id] === 9}
                        onClick={() =>
                          setCountForCard(cart.id, counts[cart.id] + 1)
                        }
                      >
                        <div className="backpack__lower--quantity--plus"></div>
                      </button>
                    </div>
                    <h1 className="backpack__lower--price">
                      ${calculateTotalPrice(cart)}
                    </h1>
                  </div>{' '}
                  {/* big */}
                </section>
              ))}
            </div>

            {cartItems.length !== 0 && (
              <section className="checkout">
                <h1 className="checkout__price">${totalPrice}</h1>
                <p className="checkout__items">Total for {totalItems} items</p>
                <div className="checkout__hr"></div>
                <button
                  className="checkout__button"
                  onClick={() =>
                    alert('at the moment the payment is not working')
                  }
                >
                  Checkout
                </button>
              </section>
            )}
          </div>
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
