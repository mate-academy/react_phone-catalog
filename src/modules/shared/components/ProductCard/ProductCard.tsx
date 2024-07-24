import './ProductCard.scss';
import { Product } from '../types/Product';
import classNames from 'classnames';
import {
  DispatchContext,
  StateContext,
} from '../../../utils/GlobalStateProvider';
import { memo, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  needToMove?: number;
  product: Product;
  enableDiscount?: boolean;
  width?: number;
  isLoading: boolean;
};

// eslint-disable-next-line react/display-name
export const ProductCard: React.FC<Props> = memo(
  ({ needToMove = 0, product, enableDiscount = false, width, isLoading }) => {
    const { cartItems, likedItems, isDarkThemeOn } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const { id, itemId, name, fullPrice, price, screen, capacity, ram, image } =
      product;
    const style = {
      transform: `translateX(${needToMove}px)`,
      width: width,
    };

    const cardStyle = needToMove ? style : {};

    const isProductinCart = cartItems.some(item => item.id === product.id);
    const isItemLiked = likedItems.some(item => item.id === product.id);

    const LikeIcon = () =>
      useMemo(
        () =>
          isDarkThemeOn ? (
            <img src="./img/icons/like.svg" alt="like icon" />
          ) : (
            <img src="./img/icons/like-dark.svg" alt="like icon" />
          ),
        [],
      );

    const handleAddToCart = () => {
      dispatch({ type: 'setCartItems', payload: [...cartItems, product] });
    };

    const handleAddLikedProduct = () => {
      if (isItemLiked) {
        dispatch({
          type: 'setLikedItems',
          payload: [...likedItems.filter(item => item.id !== product.id)],
        });

        return;
      }

      dispatch({ type: 'setLikedItems', payload: [...likedItems, product] });
    };

    return (
      <div
        className={classNames('card', {
          'is-loading': isLoading,
          'card-light': !isDarkThemeOn,
        })}
        id={`${id}`}
        style={cardStyle}
      >
        <div className="card__image-wrapper">
          <Link to={`/${product.category}/${itemId}`}>
            <img src={image} alt="card image" className="card__image" />
          </Link>
        </div>

        <h4 className="card__title">
          <Link to={`/${product.category}/${itemId}`}>{name}</Link>
        </h4>

        <div className="card__price-wrapper">
          {enableDiscount ? (
            <>
              <h3 className="card__price">${price}</h3>
              <h3
                className={classNames('discount', {
                  'discount--dark': !isDarkThemeOn,
                })}
              >
                ${fullPrice}
              </h3>
            </>
          ) : (
            <h3 className="card__price">${fullPrice}</h3>
          )}
        </div>

        <div className="card__specs">
          <div className="card__specs-item">
            <p className="card__specs-prop">Screen</p>
            <p className="card__specs-value">{screen}</p>
          </div>
          <div className="card__specs-item">
            <p className="card__specs-prop">Capacity</p>
            <p className="card__specs-value">{capacity}</p>
          </div>
          <div className="card__specs-item">
            <p className="card__specs-prop">RAM</p>
            <p className="card__specs-value">{ram}</p>
          </div>
        </div>

        <div className="card__btns">
          <button
            className={classNames('btn-add', {
              'btn-add--disabled': isProductinCart,
            })}
            onClick={handleAddToCart}
            disabled={isProductinCart}
          >
            {isProductinCart ? 'Added' : 'Add to cart'}
          </button>
          <button className="btn-like" onClick={handleAddLikedProduct}>
            {isItemLiked ? (
              <img src="./img/icons/like-filled.svg" alt="like active icon" />
            ) : (
              <LikeIcon />
            )}
          </button>
        </div>
      </div>
    );
  },
);
