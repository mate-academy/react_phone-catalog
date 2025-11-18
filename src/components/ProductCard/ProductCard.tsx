import { useContext, useMemo } from 'react';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { GlobalContext } from '../../context/GlobalContext';
import classNames from 'classnames';

type Props = {
  product: Product;
  swiperId?: string;
};

export const ProductCard: React.FC<Props> = ({ product, swiperId }) => {
  const { cart, addToCart, favorites, toggleFavorites } =
    useContext(GlobalContext);

  const isProductInCart = useMemo(() => {
    return cart.some(cartItem => cartItem.product.itemId === product.itemId);
  }, [cart, product.itemId]);

  const isProductInFaforites = useMemo(() => {
    return favorites.some(item => item.itemId === product.itemId);
  }, [favorites, product.itemId]);

  return (
    <div className="card">
      <div className="card__container">
        <div className="card__photo">
          <img src={product.image} alt="card-image" className="card__image" />
        </div>
        <p className="card__title">{product.name}</p>
        <div className="card__price-block">
          <span className="card__price">{`$ ${product.price}`}</span>
          {swiperId && (
            <span className="card__price card__price--old">
              {`$ ${product.fullPrice}`}
            </span>
          )}
        </div>
        <div className="card__specifications">
          <div className="card__block">
            <p className="card__param">Screen</p>
            <p className="card__value">{product.screen}</p>
          </div>
          <div className="card__block">
            <p className="card__param">Capacity</p>
            <p className="card__value">{product.capacity}</p>
          </div>
          <div className="card__block">
            <p className="card__param">RAM</p>
            <p className="card__value">{product.ram}</p>
          </div>
        </div>
        <div className="card__buttons">
          <button
            className={classNames('card__button-add', {
              'card__button-add--selected': isProductInCart,
            })}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              addToCart(product);
            }}
          >
            {isProductInCart ? 'Added' : 'Add to cart'}
          </button>
          <button
            className={classNames('card__button-fav', {
              'card__button-fav--selected': isProductInFaforites,
            })}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              toggleFavorites(product);
            }}
          />
        </div>
      </div>
    </div>
  );
};
