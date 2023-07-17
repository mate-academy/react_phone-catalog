import classNames from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './HeaderButtons.scss';

type ButtonType = 'favorite' | 'cart';

type Props = {
  type: ButtonType,
};

export const HeaderButtons: React.FC<Props> = ({ type }) => {
  const { cart, favorite } = useContext(Context);

  const productsAmount = (type === 'cart')
    ? cart.length
    : favorite.length;

  return (
    <div
      className={classNames(
        'top-item',
        { 'top-item--favorite': type === 'favorite' },
        { 'top-item--cart': type === 'cart' },
      )}
    >
      <Link
        to={`/${type}`}
        className="top-item__link"
      >
        {type === 'favorite'
          && (
            <span
              className="top-item__icon top-item__icon--favorite"
            />
          )}

        {type === 'cart'
          && (
            <span
              className="top-item__icon top-item__icon--cart"
            />
          )}

        {productsAmount > 0
          && (
            <span className="top-item-count">
              {productsAmount}
            </span>
          )}
      </Link>
    </div>
  );
};
