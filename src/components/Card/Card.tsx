import React, { useEffect, useState } from 'react';
import styles from './Card.module.scss';
import '../../styles/App.scss';
import MainTitle from '../MainTitle';
import NavButton from '../NavButton';
import CardItem from '../CardItem';
import Total from '../Total';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import ProductNotFound from '../ProductsNotFound';
import { loadCard, removeFromCard } from '../../store/slices/cardsSlice';
import classNames from 'classnames';

const Card: React.FC = () => {
  const { cards, loading, error, cardsLength } = useSelector(
    (state: RootState) => state.cards,
  );

  const [isOpenCheckout, setIsOpenCheckout] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadCard());
  }, [dispatch]);

  function handleOpenCheckout() {
    setIsOpenCheckout(true);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function handleCloseCheckout() {
    setIsOpenCheckout(false);
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }

  function handleClearAllCards() {
    setIsOpenCheckout(false);
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    cards.forEach(card => {
      dispatch(removeFromCard(card.card.itemId));
    });
  }

  return (
    <section className={`page__wrapper-center ${styles.card}`}>
      {loading && !error && <Loader />}

      {error && !loading && <ProductNotFound />}

      {!error && !loading && (
        <>
          <div className={styles.card__top}>
            <NavButton right={false}>Back</NavButton>
            <MainTitle>Card</MainTitle>
          </div>
          <div className={styles.card__bottom}>
            {cardsLength === 0 ? (
              <img
                src="../img/cart-is-empty.png"
                alt="Cart is empty"
                className={styles.card__empty}
              />
            ) : (
              <>
                <div className={styles.card__cards}>
                  {cards.map(card => (
                    <CardItem
                      key={card.card.itemId}
                      product={card.card}
                      card={card}
                    />
                  ))}
                </div>
                <Total onOpenCheckout={handleOpenCheckout} />
              </>
            )}
          </div>
        </>
      )}

      <div
        className={classNames(styles['card__checkout-wrapper'], {
          [styles['card__checkout-wrapper--open']]: isOpenCheckout,
        })}
      >
        <div className={styles.card__checkout}>
          <h4 className={styles['card__checkout-text']}>
            Checkout is not implemented yet.
            <br /> Do you want to clear the Cart?
          </h4>
          <div className={styles['card__checkout-buttons']}>
            <button
              className={styles['card__checkout-button']}
              onClick={handleClearAllCards}
            >
              Yes
            </button>
            <button
              className={styles['card__checkout-button']}
              onClick={handleCloseCheckout}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
