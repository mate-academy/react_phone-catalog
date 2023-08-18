import classNames from 'classnames';

import './ProductsSlider.scss';

interface Props {
  title: string;
  visibleCards: number;
  start: number;
  setStart: (arg: number) => void;
  arrLength: number;
  end: number;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  visibleCards,
  start,
  setStart,
  arrLength,
  end,
}) => {
  function calculateMax(prev: number): number {
    return Math.max(prev - 1, 0);
  }

  function calculateMin(prev: number): number {
    return Math.min(prev + 1, arrLength - visibleCards);
  }

  return (
    <div
      className="hot-phones__top"
      data-cy="productList"
    >
      <h1 className="hot-phones__title name__page">{title}</h1>
      <div className="hot-phones__buttons">
        <button
          className={classNames(
            'hot-phones__button hot-phones__button-left', {
              'hot-phones__button-left--disabled': start === 0,
            },
          )}
          type="button"
          onClick={() => setStart(calculateMax(start))}
          disabled={start === 0}
        >
          <p hidden>
            left button
          </p>
        </button>
        <button
          className={classNames(
            'hot-phones__button hot-phones__button-right', {
              'hot-phones__button-right--disabled': end >= arrLength,
            },
          )}
          type="button"
          onClick={() => setStart(calculateMin(start))}
          disabled={end === 0}
        >
          <p hidden>
            right button
          </p>
        </button>
      </div>
    </div>
  );
};
