import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

import { HeartIcon } from '@ui/icon/HeartIcon';

import { useAppDispatch, useAppSelector } from '@hooks/typedHooks';
import { TProduct } from '@utils/types/product.type';
import { ariaLabelText } from '@utils/helpers/ariaLabelTextToButton';
import { addCart } from '@store/features/cart/cart.slice';
import { addFavourites } from '@store/features/favourites/favourites.slice';

import styles from './ActionButtons.module.scss';

type TProps = {
  product?: TProduct;
};

enum CHOICE {
  cart = 'cart',
  favourites = 'favourites',
}

const ADD_TO = {
  cart: CHOICE.cart,
  favourites: CHOICE.favourites,
};

export const ActionButtons: FC<TProps> = ({ product }) => {
  const location = useLocation();
  const { itemId } = (location.state as { itemId: string }) || {};

  const { items: cartItems } = useAppSelector(state => state.cart);
  const { items: favouritesItems } = useAppSelector(state => state.favourite);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hasItemCart = cartItems.some(item => item.product.id === product?.id);
    const hasItemFavourites = favouritesItems.some(
      item => item.id === product?.id,
    );

    setIsAdded({
      cart: hasItemCart,
      favourites: hasItemFavourites,
    });
  }, [itemId, cartItems, favouritesItems, product?.id]);

  const [text, setText] = useState('Added');
  const [isAdded, setIsAdded] = useState({
    cart: false,
    favourites: false,
  });

  const onMouseEnter = () => {
    setText('Remove');
  };

  const onMouseLeave = () => {
    setText('Added');
  };

  const handleStatus = (type: CHOICE, item: TProduct | undefined) => {
    if (type === ADD_TO.cart) dispatch(addCart(item));
    if (type === ADD_TO.favourites) dispatch(addFavourites(item));

    setIsAdded(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className={styles.buttons}>
      <button
        className={cn(!isAdded.cart ? styles.add : styles.added)}
        onClick={() => handleStatus(ADD_TO.cart, product)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        type="button"
        aria-label={ariaLabelText(isAdded.cart, ADD_TO.cart)}
      >
        {!isAdded.cart ? 'Add to cart' : text}
      </button>

      <button
        className={styles.favourites}
        onClick={() => handleStatus(ADD_TO.favourites, product)}
        type="button"
        aria-label={ariaLabelText(isAdded.favourites, ADD_TO.favourites)}
      >
        <HeartIcon isOpen={isAdded.favourites} />
      </button>
    </div>
  );
};
