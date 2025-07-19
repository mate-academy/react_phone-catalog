import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleFavorite } from '../../store/favoritesSlice';
import { toggleCartItem } from '../../store/cartSlice';

import { Button, Icon } from '../SheredNavigation';

import styles from './ProductActions.module.scss';

import heartIcon from '../../../public/img/icons/heartIcon.svg';
import heartFilledIcon from '../../../public/img/icons/activeHeartIcon.svg';

type Props = {
  productId: number;
};

export const ProductActions: React.FC<Props> = ({ productId }) => {
  const dispatch = useDispatch();

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.items.includes(productId.toString()),
  );

  const isInCart = useSelector((state: RootState) =>
    state.cart.items.includes(productId.toString()),
  );

  const handleAddToCart = () => {
    dispatch(toggleCartItem(productId.toString()));
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(productId.toString()));
  };

  return (
    <div className={styles.actions}>
      <Button
        defaultText="Add to cart"
        toggledText="Added"
        isToggled={isInCart}
        onClick={handleAddToCart}
        className={styles.button}
      />

      <Icon
        to="/favorites"
        icon={heartIcon}
        iconActive={heartFilledIcon}
        alt="Add to favorites"
        active={isFavorite}
        onClick={handleToggleFavorite}
        className={styles.like}
        isCard
      />
    </div>
  );
};
