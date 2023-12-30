/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ProductType } from '../../helpers/types/ProductType';
import './ButtonIcon.scss';
import { useAppSelector } from '../../store/hooks';
import { addToFavourite, removeFromFavourite } from '../../features/favouriteSlice';

type DynamicClass = 'big' | 'shadow' | 'no-border' | 'large' | 'medium' | 'link-active' | 'disabled' | '';
type Shape = 'cart' | 'close' | 'down' | 'heart' | 'home' | 'left' | 'loop' | 'minus' | 'plus' | 'right' | 'up';

type Props = {
  type: 'event' | 'link';
  dynamicClasses?: DynamicClass[];
  shape?: Shape;
  path?: { search: string } | string;
  product?: ProductType;
  text?: string;
  disable?: boolean;
  checkFav?: boolean;
  backBtn?: boolean;
  disactive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const ButtonIcon: React.FC<Props> = ({
  type,
  dynamicClasses,
  path,
  product,
  shape,
  text,
  disable,
  checkFav,
  backBtn,
  disactive,
  onClick,
}) => {
  const dispatch = useDispatch();
  const favouriteProducts = useAppSelector(state => state.favouriteProducts);

  function isProductFavorite() {
    // const copy = [...favouriteProducts];
    const copy = Array.from(favouriteProducts);

    return copy.map(fav => JSON.stringify(fav))
      .includes(JSON.stringify(product));
  }

  function handleFavoriteClick(): void {
    if (!product) {
      return;
    }

    if (isProductFavorite()) {
      dispatch(removeFromFavourite(product.id));
    } else {
      dispatch(addToFavourite(product));
    }
  }

  const DC = dynamicClasses?.map(cl => `buttonIcon--${cl}`).join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (checkFav) {
      handleFavoriteClick();
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      aria-label="button"
      onClick={(e) => handleClick(e)}
      disabled={disable}
      className={classNames(
        'buttonIcon', DC,
      )}
    >
      {(type === 'event') && (
        <div className={classNames('buttonIcon__icon-keeper')}>
          <div className={classNames(
            'buttonIcon__icon',
            `buttonIcon__icon--${shape}`, {
              'buttonIcon__icon--disactive': disactive,
              'buttonIcon__icon--heart-active': (product && shape === 'heart' && isProductFavorite()),
            },
          )}
          />
        </div>
      )}

      {(type === 'link' && path) && (
        <NavLink
          to={path}
          aria-disabled={disable}
          className={classNames('buttonIcon__link')}
        >
          <div className={classNames('buttonIcon__icon', `buttonIcon__icon--${shape}`, {
            'button__icon--heart-active': (product && isProductFavorite()),
            'buttonIcon__icon--disactive': disactive,
          })}
          >
            {text && (
              <p className={classNames('buttonIcon__text', {
                'buttonIcon__text--backBtn': backBtn,
              })}
              >
                {text}
              </p>
            )}
          </div>
        </NavLink>
      )}
    </button>
  );
};
