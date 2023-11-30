import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addAmount, removeAmount, removeCard } from '../../features/cardSlice';
import close from '../../img/icon/Close.png';
import './Card.scss';

export const Card = () => {
  const cardPhones = useAppSelector(state => state.card.cardPhones);
  const dispatch = useAppDispatch();

  return (
    <section>
      {/* {!isLoading && isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )} */}
      {!cardPhones.length && <p>The basket is empty </p>}

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
              type="button"
              aria-label="Decrement value"
              disabled={phone?.amount === 1}
              onClick={() => dispatch(removeCard(phone))}
            >
              <img src={close} alt="close" />
            </button>
            <div className="card__img">
              <img className="card__img" src={`_new/${phone.image}`} alt={phone.name} />
            </div>
            <div>
              <p>{phone.name}</p>
            </div>
            <div>
              <button
                type="button"
                aria-label="Decrement value"
                disabled={phone?.amount === 1}
                onClick={() => dispatch(removeAmount(phone))}
              >
                -
              </button>

              <span>{phone?.amount}</span>

              <button
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

    </section>
  );
};
