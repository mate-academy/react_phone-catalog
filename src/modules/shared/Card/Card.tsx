import { Link } from 'react-router-dom';
import s from './Card.module.scss';
import type { Product } from '../../../types/Product';
import { PrimaryButton } from '../PrimaryButton';
import { AddToFovouritesButton } from '../AddToFovouritesButton';
import classNames from 'classnames';
import { useContext } from 'react';
import { CartContext } from '../../../CartContext';
import { FavouritesContext } from '../../../FavouritesContext';

type Props = {
  product: Product;
  grid?: boolean;
};

export const Card = ({ product, grid = false }: Props) => {
  const { cart, setCart } = useContext(CartContext);
  const { favourites, setFavourites } = useContext(FavouritesContext);

  const isInCart = (id: string) => {
    return !!cart.find(item => item.id === id);
  };

  const isFavourites = (id: string) => {
    return !!favourites.find(item => item.itemId === id);
  };

  return (
    <div
      className={classNames(s.card, {
        [s['card--grid']]: grid,
      })}
    >
      <div className={s.card__content}>
        <Link to={`/product/${product.itemId}`} className={s.card__imgLink}>
          <img src={'./' + product.image} className={s.card__img} alt="image" />
        </Link>

        <Link to={`/product/${product.itemId}`} className={s.card__name}>
          {product.name}
        </Link>

        <div className={s.card__prices}>
          <div className={s.card__price}>${product.price}</div>
          <div className={s.card__fullPrice}>${product.fullPrice}</div>
        </div>

        <div className={s.card__divider} />

        <div className={s.card__specs}>
          <div className={s.card__spec}>
            <div className={s.card__label}>Screen</div>
            <div className={s.card__value}>{product.screen}</div>
          </div>
          <div className={s.card__spec}>
            <div className={s.card__label}>Capacity</div>
            <div className={s.card__value}>{product.capacity}</div>
          </div>
          <div className={s.card__spec}>
            <div className={s.card__label}>RAM</div>
            <div className={s.card__value}>{product.ram}</div>
          </div>
        </div>

        <div className={s.card__buttons}>
          {isInCart(product.itemId) ? (
            <PrimaryButton selected>Added to cart</PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={() =>
                setCart(prev => [
                  ...prev,
                  { id: product.itemId, quantity: 1, product: product },
                ])
              }
            >
              Add to cart
            </PrimaryButton>
          )}
          <AddToFovouritesButton
            selected={isFavourites(product.itemId)}
            onClick={() =>
              setFavourites(prev =>
                isFavourites(product.itemId)
                  ? [...prev].filter(item => item.itemId !== product.itemId)
                  : [...prev, product],
              )
            }
          />
        </div>
      </div>
    </div>
  );
};
