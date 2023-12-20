/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ProductType } from '../../helpers/types/ProductType';
import { ProductsContext } from '../../store/ProductsContext';
import './ButtonIcon.scss';

type DynamicClass = 'big' | 'shadow' | 'no-border' | 'large' | 'medium' | 'link-active' | 'disabled' | '';
type Shape = 'cart' | 'close' | 'down' | 'heart' | 'home' | 'left' | 'left-light' | 'loop' | 'minus' | 'plus' | 'right' | 'right-light' | 'up' | 'up-light';

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
  onClick,
}) => {
  const { favoriteProducts, setFavoriteProducts } = useContext(ProductsContext);
  const navigate = useNavigate();

  function isProductFavorite() {
    const copy = [...favoriteProducts];

    return copy.map(fav => JSON.stringify(fav))
      .includes(JSON.stringify(product));
  }

  function handleFavoriteClick(): void {
    if (!product) {
      return;
    }

    if (isProductFavorite()) {
      setFavoriteProducts(cur => cur.filter(item => item !== product));
    } else {
      setFavoriteProducts(cur => [...cur, product]);
    }
  }

  const DC = dynamicClasses?.map(cl => `buttonIcon--${cl}`).join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (backBtn) {
      // () => navigate('..');
      navigate(-1);
      // window.history.go(-1);
    }

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
