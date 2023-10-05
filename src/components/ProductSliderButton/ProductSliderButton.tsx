import { FC } from 'react';
import classNames from 'classnames';

type Props = {
  isActive: boolean;
  onHandleClick: () => void;
  title: JSX.Element;
};

export const ProductsSliderButton: FC<Props> = ({
  isActive,
  onHandleClick,
  title,
}) => (
  <button
    type="button"
    className={classNames('products-slider__button', {
      'products-slider__button--active': isActive,
    })}
    onClick={onHandleClick}
  >
    {title}
  </button>
);
