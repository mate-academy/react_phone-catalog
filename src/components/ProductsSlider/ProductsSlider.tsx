import React, {
  useState,
  useEffect,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getSuggestedProducts,
} from '../../helpers/htmlClient';
import arrowLeft from '../../images/arrow-left.svg';
import arrowLeftDisabled from '../../images/arrow-left-disabled.svg';
import arrowRight from '../../images/arrow-right.svg';
import arrowRightDisabled from '../../images/arrow-right-disabled.svg';

type Props = {
  section: 'Hot prices' | 'Brand new models' | 'You may also like',
};

const GAP = 16;
const CARD_WIDTH = 272;
const FULL_VISIBLE_WIDTH = 1136;

export const ProductsSlider: React.FC<Props> = React.memo(({ section }) => {
  const { pathname } = useParams();
  const [currentPropducts, setCurrentPropducts] = useState<Phone[]>([]);
  const [fullWidth, setFullWidth] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(0);
  const [isDisabledPrev, setIsDisabledPrev] = useState(true);
  const [isDisabledNext, setIsDisabledNext] = useState(false);

  useEffect(() => {
    switch (section) {
      case 'Hot prices':
        getHotPriceProducts()
          .then(res => {
            setCurrentPropducts(res);
            setFullWidth((res.length - 1) * (CARD_WIDTH + GAP) + CARD_WIDTH);
          });
        break;

      case 'Brand new models':
        getBrandNewProducts()
          .then(res => {
            setCurrentPropducts(res);
            setFullWidth((res.length - 1) * (CARD_WIDTH + GAP) + CARD_WIDTH);
          });
        break;

      case 'You may also like':
        getSuggestedProducts()
          .then(res => {
            setCurrentPropducts(res);
            setFullWidth((res.length - 1) * (CARD_WIDTH + GAP) + CARD_WIDTH);
          });

        break;

      default:
        break;
    }
  }, [section]);

  const handlePrev = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (isDisabledPrev) {
      event.preventDefault();

      return;
    }

    setIsDisabledNext(false);
    setCurrentWidth(currentNumber => {
      const resultWidth = currentNumber - FULL_VISIBLE_WIDTH - GAP;

      if (resultWidth > 0) {
        return resultWidth;
      }

      setIsDisabledPrev(true);

      return 0;
    });
  };

  const handleNext = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (isDisabledNext) {
      event.preventDefault();

      return;
    }

    setIsDisabledPrev(false);
    setCurrentWidth(currentNumber => {
      const resultWidth = currentNumber + FULL_VISIBLE_WIDTH + GAP;

      if ((fullWidth - resultWidth) > FULL_VISIBLE_WIDTH) {
        return resultWidth;
      }

      setIsDisabledNext(true);

      return fullWidth - FULL_VISIBLE_WIDTH;
    });
  };

  return (
    <div data-cy="cardsContainer">
      <div className="main__upper-wrapper">
        <h1 className="main__title">{section}</h1>

        <div className="main__button-slider">
          <Link
            to={{ pathname }}
            className={classNames('icon', { 'icon--disabled': isDisabledPrev })}
            onClick={handlePrev}
          >
            {isDisabledPrev ? (
              <img
                src={arrowLeftDisabled}
                alt="arrow"
                className="icon__arrow"
              />
            ) : (
              <img
                src={arrowLeft}
                alt="arrow"
                className="icon__arrow"
              />
            )}
          </Link>

          <Link
            to={{ pathname }}
            className={classNames('icon', { 'icon--disabled': isDisabledNext })}
            onClick={handleNext}
          >
            {isDisabledNext ? (
              <img
                src={arrowRightDisabled}
                alt="arrow"
                className="icon__arrow"
              />
            ) : (
              <img
                src={arrowRight}
                alt="arrow"
                className="icon__arrow"
              />
            )}
          </Link>
        </div>
      </div>

      {currentPropducts.length > 0 && (
        <div className="phones">
          {currentPropducts.map(phone => (
            <div
              key={phone.id}
              style={{
                transform: `translateX(-${currentWidth}px)`,
                transition: 'transform 1.5s',
              }}
            >
              <ProductCard card={phone} key={phone.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
