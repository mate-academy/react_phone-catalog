import { useEffect, useState } from 'react';
import './ActionsBlock.scss';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToCart,
  addToFavourites,
  removeFavourite,
  removeFromCart,
} from '../../features/product/productSlice';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
  paddingFav: string;
};

export const ActionsBlock: React.FC<Props> = ({ product, paddingFav }) => {
  const dispatch = useAppDispatch();
  const [inCart, setInCart] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const {
    id,
  } = product;

  const {
    cart,
    favourites,
  } = useAppSelector(state => state.phones);

  const handleAdd = (key: string) => {
    const valid = key === 'cart' ? cart : favourites;

    dispatch(key === 'cart' ? addToCart(product) : addToFavourites(product));

    localStorage.setItem(key,
      JSON.stringify([...valid, product]));
  };

  const handleDelete = (key: string) => {
    const valid = key === 'cart' ? cart : favourites;

    dispatch(key === 'cart'
      ? removeFromCart(product)
      : removeFavourite(product));

    localStorage.setItem(key,
      JSON.stringify([...valid
        .filter(pr => pr.id !== id)]));
  };

  useEffect(() => {
    const addedToCart = cart.find(pr => pr.id === id);
    const addedToFavourite = favourites.find(favourite => favourite.id === id);

    setInCart(!!addedToCart);
    setIsFavourite(!!addedToFavourite);
  }, [cart, id, favourites]);

  return (
    <>
      {inCart ? (
        <button
          className="actions-block__button actions-block__button--added"
          type="button"
          onClick={() => handleDelete('cart')}
        >
          Added to cart
        </button>
      ) : (
        <button
          className="actions-block__button"
          type="button"
          onClick={() => handleAdd('cart')}
        >
          Add to cart
        </button>
      )}

      <button
        className={cn('actions-block__favourites', {
          'actions-block__favourites--added': isFavourite,
        })}
        style={{ padding: paddingFav }}
        aria-label="like"
        type="button"
        onClick={isFavourite
          ? () => handleDelete('favourites')
          : () => handleAdd('favourites')}
      >
        <div
          className={cn('icon', {
            'icon-favourites-like': isFavourite,
            'icon-favourites': !isFavourite,
          })}
        />
      </button>
    </>
  );
};
