/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ProductType } from '../../helpers/types/ProductType';
import './ButtonIcon.scss';
import { useAppSelector } from '../../store/hooks';
import { addToFavourite, removeFromFavourite } from '../../features/favouriteSlice';
import { setFavouriteModal } from '../../features/modalSlice';

type DynamicClass = 'big' | 'biggest' | 'shadow' | 'no-border' | 'large' | 'medium' | 'link-active' | 'disabled' | 'light-border' | '';
type Shape = 'cart' | 'cart-big' | 'close' | 'down' | 'heart' | 'favourite-big' | 'home' | 'left' | 'loop' | 'minus' | 'menu' | 'plus' | 'right' | 'up' | 'num';

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

  const getLinkNavClass = ({ isActive }: { isActive: boolean }) => (
    classNames('buttonIcon__link', {
      'is-active': isActive,
    }));

  function isProductFavorite() {
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
      dispatch(setFavouriteModal());
    }
  }

  // console.log(path);

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
        'buttonIcon', DC, {
          'buttonIcon--disactive': disactive,
        },
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
          to={path.toString()}
          aria-disabled={disable}
          className={getLinkNavClass}
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
