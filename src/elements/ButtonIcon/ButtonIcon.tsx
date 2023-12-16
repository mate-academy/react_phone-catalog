/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../../helpers/types/ProductType';
import { ProductsContext } from '../../store/ProductsContext';
import { isProductFavorite } from '../../helpers/utils/checkProductStatus';
import './ButtonIcon.scss';

type DynamicClass = 'big' | 'shadow' | 'hidden' | 'no-border' | 'large' | '';
type Shape = 'cart' | 'close' | 'down' | 'heart' | 'home' | 'left' | 'left-light' | 'loop' | 'minus' | 'plus' | 'right' | 'right-light' | 'up' | 'up-light';

type Props = {
  type: 'event' | 'link';
  dynamicClasses?: DynamicClass[];
  shape?: Shape;
  path?: string;
  product?: ProductType;
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const ButtonIcon: React.FC<Props> = ({
  type,
  dynamicClasses,
  path,
  product,
  shape,
  text,
  onClick,
}) => {
  const { favoriteProducts } = useContext(ProductsContext);

  const DC = dynamicClasses?.map(cl => `buttonIcon--${cl}`).join(' ');

  return (
    <button
      type="button"
      aria-label="button"
      onClick={onClick}
      className={classNames(
        'buttonIcon', DC,
      )}
    >
      {(type === 'event') && (
        <div className={classNames('buttonIcon__icon-keeper')}>
          <div className={classNames(
            'buttonIcon__icon',
            `buttonIcon__icon--${shape}`, {
              'buttonIcon__icon--heart-active': (product && shape === 'heart' && isProductFavorite(favoriteProducts, product)),
            },
          )}
          />
        </div>
      )}

      {(type === 'link' && path) && (
        <Link
          to={path}
          className="header__link link"
        >
          <div className={classNames('buttonIcon__icon', `buttonIcon__icon--${shape}`, {
            'button__icon--heart-active': (product && isProductFavorite(favoriteProducts, product)),
          })}
          >
            {text && (
              <p>{text}</p>
            )}
          </div>
        </Link>
      )}
    </button>
  );
};
