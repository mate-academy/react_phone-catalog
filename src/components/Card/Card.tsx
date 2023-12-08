import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addAmount, removeAmount, removeCard } from '../../features/cardSlice';
import close from '../../img/icon/Close.png';
import './Card.scss';

export const Card = () => {
  const cardPhones = useAppSelector(state => state.card.cardPhones);
  const dispatch = useAppDispatch();
  const totalPrice = cardPhones.reduce((accumulator, currentProduct) => {
    if (currentProduct.amount !== undefined) {
      return accumulator + (currentProduct.amount * currentProduct.fullPrice);
    }

    return 0;
  }, 0);
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <section>
      {/* {!isLoading && isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )} */}
      {!cardPhones.length && <p>The basket is empty </p>}
      <button
        type="button"
        className="back"
        data-cy="backButton"
        onClick={handleGoBack}
      >
        back
      </button>
      <h1>Cart</h1>
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
                <img className="card__img" src={`_new/${phone.image}`} alt={phone.name} />
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
              {`Total for ${cardPhones.length}`}
              {cardPhones.length === 1 ? ' item' : ' items'}
            </p>
          </div>
          <button
            className="card__checkout"
            type="button"
            aria-label="checkout"
          >
            Checkout
          </button>

        </div>
      </div>

    </section>
  );
};
