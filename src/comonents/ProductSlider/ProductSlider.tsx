import classNames from 'classnames';

import { useMemo } from 'react';

import './ProductSlider.scss';

const buttons = ['prev', 'next'];

type Props = {
  currentSlide: number,
  setCurrentSlide: (currentSlide: number) => void,
  length: number,
};

export const ProductSlider: React.FC<Props> = ({
  currentSlide,
  setCurrentSlide,
  length,
}) => {
  const handleButtonClick = (action: string) => {
    let newSlide = currentSlide;

    if (action === 'prev' && currentSlide > 0) {
      newSlide = currentSlide - 1;
    } else if (action === 'next' && currentSlide < length) {
      newSlide = currentSlide + 1;
    }

    setCurrentSlide(newSlide);
  };

  const isPrevDisabled = useMemo(
    () => currentSlide === 0, [currentSlide],
  );
  const isNextDisabled = useMemo(
    () => currentSlide === length, [currentSlide, length],
  );

  return (
    <div className="product-slider container">
      {buttons.map(action => (
        <button
          key={action}
          type="button"
          title={`move ${action === 'prev' ? 'back' : 'forward'}`}
          className={classNames('product-slider__button', {
            'product-slider__button--disabled': action === 'prev'
              ? isPrevDisabled
              : isNextDisabled,
          })}
          onClick={() => handleButtonClick(action)}
        >
          <span
            className={`
              icon
              icon--arrow
              icon--${action}
              ${action === 'prev' && isPrevDisabled
          ? 'icon--arrow-dis'
          : ''}
              ${action === 'next' && isNextDisabled
          ? 'icon--arrow-dis'
          : ''}
            `}
          />
        </button>
      ))}
    </div>
  );
};
