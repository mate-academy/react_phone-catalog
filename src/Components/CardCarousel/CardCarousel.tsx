import classNames from 'classnames';
import { useState } from 'react';
import { Product } from '../../types/Product';
import { Phones } from '../Phones';
import './CardCarousel.scss';

type PropTypes = {
  products: Product[]
  isLoading: boolean;
  title: string;
};

export const CardCarousel: React.FC<PropTypes> = ({
  products,
  isLoading,
  title,
}) => {
  const CARD_WIDTH = 250;
  const CARD_GAP = 22;
  const CARDS_PER_PAGE = window.innerWidth < 1020 ? 1 : 4;

  const [lastVisibleCard, setLastVisibleCard] = useState(CARDS_PER_PAGE);
  const scroll = -(lastVisibleCard - CARDS_PER_PAGE) * (CARD_WIDTH + CARD_GAP);

  const disabledOnPrev = CARDS_PER_PAGE === lastVisibleCard;
  const disabledOnNext = lastVisibleCard === products.length;

  const styles = {
    transform: `translateX(${scroll}px)`,
    transition: 'transform 1s',
  };

  const onNext = () => {
    const totalCards = products.length;
    let newCard = lastVisibleCard + CARDS_PER_PAGE;

    if (newCard > totalCards) {
      newCard = products.length;
    }

    setLastVisibleCard(newCard);
  };

  const onPrev = () => {
    const totalCards = products.length;
    let newCard = lastVisibleCard - CARDS_PER_PAGE;

    if (newCard < CARDS_PER_PAGE) {
      newCard = totalCards;
    }

    setLastVisibleCard(newCard);
  };

  return (
    <section className="page__section card-carousel" id="card-carousel">
      <div className="container">
        <div className="card-carousel__component">
          <h1 className="card-carousel__title">
            {title}
          </h1>
          <div className="card-carousel__box">
            <button
              type="button"
              className={classNames(
                'card-carousel__button',
                {
                  'card-carousel__disabled': disabledOnPrev,
                },
              )}
              onClick={onPrev}
              disabled={disabledOnPrev}
            >
              <div className="card-carousel__arr card-carousel__arr--left" />
            </button>
            <button
              type="button"
              className={classNames(
                'card-carousel__button',
                {
                  'card-carousel__disabled': disabledOnNext,
                },
              )}
              onClick={onNext}
              disabled={disabledOnNext}
            >
              <div
                className="card-carousel__arr card-carousel__arr--right"
              />
            </button>
          </div>
        </div>
        <div className="card-carousel__base-container">
          <div className="card-carousel__wrapper">
            <ul
              className="card-carousel__card-container"
              style={styles}
            >
              <Phones
                data-cy="cardsContainer"
                products={products}
                isLoading={isLoading}
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
