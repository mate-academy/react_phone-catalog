import { Link, NavLink, useLocation } from 'react-router-dom';
import { CardPhone } from '../../cardPhone';
import './CartPage.scss';
import { useEffect, useState } from 'react';

interface CartPageProps {
  likeItems: CardPhone[];
  cartItems: CardPhone[];
  setCartItems: (value: (prevItems: CardPhone[]) => CardPhone[]) => void;
}

export const CartPage = ({
  likeItems,
  cartItems,
  setCartItems,
}: CartPageProps) => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

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

  useEffect(() => {
    const initialCounts: { [key: string]: number } = {};

    cartItems.forEach(item => {
      initialCounts[item.id] = 1;
    });
    setCounts(initialCounts);
  }, [cartItems]);

  const setCountForCard = (id: string, value: number) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: value,
    }));
  };

  useEffect(() => {
    setTotalItems(0);
    for (const prop in counts) {
      setTotalItems(prevToralItems => prevToralItems + counts[prop]);
    }
  }, [totalPrice, setTotalPrice, counts]);

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
          <a href="#">
            <div className="header--logo"></div>
          </a>
          <ul className="header__list">
            <Link to="/" className="header__href">
              <li className="header__item">home</li>
            </Link>
            <Link to="/phones" className="header__href">
              <li className="header__item">phones</li>
            </Link>
            <Link to="/tablets" className="header__href">
              <li className="header__item">tablets</li>
            </Link>
            <Link to="/accessories" className="header__href">
              <li className="header__item">accessories</li>
            </Link>
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
            <div className="header__navigation--bag"></div>
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
