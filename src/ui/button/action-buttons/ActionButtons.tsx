import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import cn from 'classnames';

import { Icons } from '@ui/index';

import {
  useAction,
  useAriaLabelText,
  useCart,
  useFavourites,
} from '@hooks/index';

import { ADD_TO } from '@utils/constants/actionButtons';
import { CHOICE } from '@utils/types/cart-favourites.enum';
import { TProduct } from '@utils/types/product.type';

import styles from './ActionButtons.module.scss';

type TProps = {
  product?: TProduct;
};

export const ActionButtons: FC<TProps> = ({ product }) => {
  const { itemId } = useParams();
  const { cartItems } = useCart();
  const { favouritesItems } = useFavourites();
  const { addCart, addFavourites } = useAction();
  const { t } = useTranslation();
  const [isAdded, setIsAdded] = useState({
    cart: false,
    favourites: false,
  });

  const localAdded = t('button.added');
  const localRemove = t('button.remove');
  const localAddToCart = t('button.add');

  const [buttonText, setButtonText] = useState(localAdded);

  const isInCart = useMemo(
    () => cartItems.some(item => item.product?.id === product?.id),
    [cartItems, product],
  );
  const isInFavourites = useMemo(
    () => favouritesItems.some(item => item.id === product?.id),
    [favouritesItems, product],
  );

  useEffect(() => {
    if (!product) return;
    setIsAdded({ cart: isInCart, favourites: isInFavourites });
    setButtonText(isInCart ? localAdded : localAddToCart);
  }, [itemId, isInCart, isInFavourites, product]);

  const onMouseEnter = () => {
    setButtonText(localRemove);
  };

  const onMouseLeave = () => {
    setButtonText(localAdded);
  };

  const onClickStatus = (type: CHOICE, item: TProduct | undefined) => {
    if (!item) return;

    if (type === ADD_TO.cart) addCart(item);
    if (type === ADD_TO.favourites) addFavourites(item);

    setIsAdded(prev => ({
      ...prev,
      [type]: !prev[type],
    }));

    setButtonText(!isAdded.cart ? t('button.added') : t('button.add'));
  };

  const cartAriaLabel = useAriaLabelText(isAdded.cart, ADD_TO.cart);
  const favouritesAriaLabel = useAriaLabelText(
    isAdded.favourites,
    ADD_TO.favourites,
  );

  return (
    <div className={styles.buttons}>
      <button
        className={cn(!isAdded.cart ? styles.add : styles.added)}
        onClick={() => onClickStatus(ADD_TO.cart, product)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        type="button"
        aria-label={cartAriaLabel}
      >
        {!isAdded.cart ? localAddToCart : buttonText}
      </button>

      <button
        className={cn(styles.favourites, {
          [styles.favorite]: isAdded.favourites,
        })}
        onClick={() => onClickStatus(ADD_TO.favourites, product)}
        type="button"
        aria-label={favouritesAriaLabel}
      >
        <Icons.HeartIcon isOpen={isAdded.favourites} />
      </button>
    </div>
  );
};
