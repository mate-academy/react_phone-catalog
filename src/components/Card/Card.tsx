import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addAmount, removeAmount, removeCard } from '../../features/cardSlice';
import close from '../../img/icon/Close.png';
import './Card.scss';

export const Card = () => {
  const URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';
  const cardPhones = useAppSelector(state => state.card.cardPhones);
  const dispatch = useAppDispatch();
  const totalPrice = cardPhones.reduce((accumulator, currentProduct) => {
    if (currentProduct.amount !== undefined) {
      return accumulator + (currentProduct.amount * currentProduct.price);
    }

    return 0;
  }, 0);
  const totalCount = cardPhones.reduce((count, currentProduct) => {
    if (currentProduct.amount !== undefined) {
      return (count + currentProduct.amount);
    }

    return 0;
  }, 0);
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <main>
      <section>
        <div className="container">
          <button
            type="button"
            className="back"
            data-cy="backButton"
            onClick={handleGoBack}
          >
            back
          </button>
          <h1>Cart</h1>
          {!cardPhones.length && <h2>The basket is empty </h2>}
          <div className="card__container">
            <ul
              className="card__phones"
            >
              {cardPhones.map((phone) => (
                <li
                  className="card__item"
                  data-cy="item"
                  key={phone.phoneId}
                >
                  <button
                    className="card__icon-close"
                    type="button"
                    aria-label="Decrement value"
                    onClick={() => dispatch(removeCard(phone))}
                  >
                    <img
                      className="card__icon-close-img"
                      src={close}
                      alt="close"
                    />
                  </button>
                  <div className="card__img">
                    <img className="card__img" src={`${URL}${phone.image}`} alt={phone.name} />
                  </div>
                  <div>
                    <p className="card__phone-name">{phone.name}</p>
                  </div>
                  <div className="card__amount">
                    <button
                      className="card__button"
                      type="button"
                      aria-label="Decrement value"
                      disabled={phone?.amount === 1}
                      onClick={() => dispatch(removeAmount(phone))}
                    >
                      -
                    </button>

                    <span className="card__amount-text">{phone?.amount}</span>

                    <button
                      className="card__button"
                      type="button"
                      aria-label="Increment value"
                      onClick={() => dispatch(addAmount(phone))}
                    >
                      +
                    </button>
                  </div>
                  {phone.amount && (
                    <div>
                      <p>{`$${phone.price * phone?.amount}`}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="card__sum">
              <div>
                <p className="card__sum-total">
                  {`$${totalPrice}`}
                </p>
                <p className="card__sum-text">
                  {`Total for ${totalCount}`}
                  {totalCount === 1 ? ' item' : ' items'}
                </p>
              </div>
              <Link
                to="/cartbuy"
              >
                <button
                  className="card__checkout"
                  type="button"
                  aria-label="checkout"
                >
                  Checkout
                </button>
              </Link>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
