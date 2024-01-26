/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './CardPage.scss';
import { CardContext } from '../../api/context/CardContext';
import { BackButton } from '../../components/BackButton';
import { CardEmpty } from '../../components/CardEmpty';
import { CommingSoon } from '../../components/CommingSoon';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const CardPage = () => {
  const {
    cardProducts,
    removeProduct,
    increment,
    decrement,
    countProducts,
    visbleProducts,
  } = useContext(CardContext);

  const [isCommingOpen, setIsCommingOpen] = useState(false);

  const hadleCheckout = () => {
    setIsCommingOpen(true);
    setTimeout(() => {
      setIsCommingOpen(false);
    }, 3000);
  };

  const totalPrice = useMemo(() => {
    return cardProducts.reduce((sum, product) => sum + product.price, 0);
  }, [cardProducts]);

  return (
    <div className="cardPage">
      {isCommingOpen && <CommingSoon />}
      <BackButton />

      <h1 className="cardPage__title">
        Cart
      </h1>

      {!cardProducts.length ? (
        <CardEmpty />
      ) : (
        <div className="cardPage__content">
          <ul className="cardPage__list">
            {visbleProducts.map(product => (
              <li className="cardPage__item" key={product.id}>
                <div className="cardPage__item--left">
                  <button
                    type="button"
                    className="cardPage__item--btn"
                    data-cy="cartDeleteButton"
                    onClick={() => removeProduct(product.id)}
                  >
                    <div className="icon icon--delete" />
                  </button>
                  <div className="cardPage__item--photo">
                    <img
                      src={`${BASE_URL}${product.image}`}
                      alt="product"
                      className="cardPage__item--img"
                    />
                  </div>
                  <Link
                    to={`/${product.category}/${product.itemId}`}
                    className="cardPage__item--name"
                  >
                    {product.name}
                  </Link>
                </div>
                <div className="cardPage__item--right">
                  <div className="cardPage__item--slider">
                    <button
                      className="cardPage__item--slider-btn"
                      type="button"
                      onClick={() => decrement(product.id)}
                      disabled={countProducts(product.id) === 1}
                    >
                      <div className="icon icon--minus" />

                    </button>

                    <p className="cardPage__item--slider-amount">
                      {countProducts(product.id)}
                    </p>

                    <button
                      className="cardPage__item--slider-btn"
                      type="button"
                      onClick={() => increment(product)}
                    >
                      <div className="icon icon--plus" />

                    </button>
                  </div>

                  <p className="cardPage__item--price">
                    {`$${product.price}`}
                  </p>

                </div>

              </li>
            ))}
          </ul>

          <div className="cardPage__checkout">
            <div className="cardPage__checkout--total">
              <p className="cardPage__checkout--total-price">
                {`$${totalPrice}`}
              </p>

              <p className="cardPage__checkout--total-item">
                {cardProducts.length === 1
                  ? 'Total for 1 item'
                  : `Total for ${cardProducts.length} items`}
              </p>
            </div>

            <button
              className="cardPage__checkout--btn"
              type="button"
              onClick={hadleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
