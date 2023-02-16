import classNames from 'classnames';
import './ProductsSlider.scss';

type Props = {
  name: string,
  sliderPosition: number,
  itemsAmount: number,
  prevItem: () => void,
  nextItem: () => void,
};

export const ProductsSlider: React.FC<Props> = ({
  name,
  sliderPosition,
  itemsAmount,
  prevItem,
  nextItem,
}) => {
  const visibleItems = 288 * 4;

  return (
    <div className="productSlider__header">
      <h3 className="productSlider__title">
        {name}
      </h3>

      <div className="productSlider__buttons">
        <button
          type="button"
          className={classNames(
            'productSlider__button', {
              'productSlider__button--active': sliderPosition > 0,
            },
          )}
          onClick={prevItem}
          disabled={sliderPosition === 0}
        >
          {sliderPosition === 0
            ? (
              <img
                src="./img/arrowLeftDisabled.svg"
                alt="prevItemDisabled"
              />
            )
            : <img src="./img/arrowLeft.svg" alt="prevItem" />}
        </button>

        <button
          type="button"
          className={classNames(
            'productSlider__button', {
              'productSlider__button--active': sliderPosition
                < (itemsAmount * 288 - visibleItems),
            },
          )}
          onClick={nextItem}
          disabled={sliderPosition
              === (itemsAmount * 288 - visibleItems)}
        >
          {sliderPosition
              === (itemsAmount * 288 - visibleItems)
            ? (
              <img
                src="./img/arrowRightDisabled.svg"
                alt="nextItemDisabled"
              />
            )
            : <img src="./img/arrowRight.svg" alt="nextItem" />}
        </button>
      </div>
    </div>
  );
};
