/* eslint-disable react/self-closing-comp */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ProductCard } from '../ProductCard';
import { Phone } from '../../types/Phone';
import { Loader } from '../Loader';
import { SliderTitles } from '../../enum/SliderTitles';
import './ProductSlider.scss';

const ONE_CARD_LENGTH = 288;
const FOUR_CARD_LENGTH = 1152;

type Props = {
  phones: Phone[],
  title: SliderTitles,
  isError: boolean,
  isLoading: boolean,
};

export const ProductSlider: React.FC<Props> = ({
  title,
  phones,
  isError,
  isLoading,
}) => {
  const [transform, setTransform] = useState(-0);
  const [isDisabledLeft, setIsDisabledLeft] = useState(false);
  const [isDisabledRight, setIsDisabledRight] = useState(false);

  const MAX_TRANSFROM = phones.length * ONE_CARD_LENGTH - FOUR_CARD_LENGTH;

  useEffect(() => {
    if (transform === 0) {
      setIsDisabledLeft(true);

      return;
    }

    if (transform === MAX_TRANSFROM) {
      setIsDisabledRight(true);

      return;
    }

    setIsDisabledLeft(false);
    setIsDisabledRight(false);
  }, [transform]);

  const handleSlideLeft = () => {
    if (transform - FOUR_CARD_LENGTH <= 0) {
      setTransform(0);

      return;
    }

    setTransform((prevState) => prevState - FOUR_CARD_LENGTH);
  };

  const handleSlideRight = () => {
    if (transform + FOUR_CARD_LENGTH > MAX_TRANSFROM) {
      setTransform(MAX_TRANSFROM);

      return;
    }

    setTransform((prevState) => prevState + FOUR_CARD_LENGTH);
  };

  return (
    <div className="slider__section">
      <div className="slider__header">
        <h1
          className="slider__header__title"
        >
          {title}
        </h1>

        <div className="slider__header__buttons">
          <button
            type="button"
            aria-label="arrow-left"
            className={classNames(
              'arrow arrow--left',
              { 'arrow--left--is-disabled': isDisabledLeft },
            )}
            onClick={() => handleSlideLeft()}
            disabled={isDisabledLeft}
          />

          <button
            type="button"
            aria-label="arrow-right"
            className={classNames(
              'arrow arrow--right',
              { 'arrow--right--is-disabled': isDisabledRight },
            )}
            onClick={() => handleSlideRight()}
            disabled={isDisabledRight}
          />
        </div>
      </div>

      <div className="slider__products">
        {isLoading && !isError && <Loader />}

        <div
          className="slider__products__container"
          style={{ transform: `translateX(-${transform}px` }}
        >
          {!isLoading && !isError && phones.map(phone => (
            <ProductCard
              phone={phone}
              key={phone.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
