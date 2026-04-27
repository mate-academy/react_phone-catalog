import React, { memo } from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../../../types/Product';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toggleFavourite } from '../../../../features/favouritesSlice';
import { add } from '../../../../features/cartSlice';
import { Typography } from '../../atoms/Typography';
import { ProductPrice } from '../../molecules/ProductPrice';
import { Divider } from '../../atoms/Divider';
import { ProductSpec } from '../../molecules/ProductSpec';
import { ProductControls } from '../../molecules/ProductControls';
import { Icon } from '../../atoms/Icon';
import { HeartFilledIcon } from '../../../../assets/icons/heart-filled-icon';
import { HeartIcon } from '../../../../assets/icons/heart-icon';
import { toast } from '../../../NotificationToast';

type Props = {
  product: Product;
};

export const ProductCard = memo(({ product }: Props) => {
  const dispatch = useAppDispatch();
  const { favourites } = useAppSelector(state => state.favourites);
  const { cartItems } = useAppSelector(state => state.cart);
  const { t } = useTranslation();

  const isInFavourites = favourites.some(fav => fav.itemId === product.itemId);
  const isInCart = cartItems.some(
    cartItem => cartItem.itemId === product.itemId,
  );

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(toggleFavourite(product));
    toast({
      description: t(
        `notification.${isInFavourites ? 'remove' : 'add'}.favourites`,
        { name: product.name },
      ),
    });
  };

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(add(product));
    toast({
      description: t(`notification.${isInCart ? 'remove' : 'add'}.cart`, {
        name: product.name,
      }),
    });
  };

  return (
    <Link className={styles.card} to={`/product/${product.itemId}`}>
      <div className={styles.card__content}>
        <img
          src={product.image}
          alt={`${product.name} photo`}
          className={styles.card__photo}
        />
        <div className={styles.card__description}>
          <Typography variant="body" tag="h3" className={styles.card__title}>
            {product.name}
          </Typography>
          <ProductPrice fullPrice={product.fullPrice} price={product.price} />
          <Divider />
          <div className={styles.card__specs}>
            <ProductSpec
              label={t('product.specifications.screen')}
              value={product.screen}
            />
            <ProductSpec
              label={t('product.specifications.capacity')}
              value={product.capacity}
            />
            <ProductSpec
              label={t('product.specifications.ram')}
              value={product.ram}
            />
          </div>
          <ProductControls
            onAddToCart={addToCart}
            onToggleFavourite={handleToggle}
            isFavourite={isInFavourites}
            isInCart={isInCart}
            cartButtonText={t(
              `buttons.actions.${isInCart ? 'inCart' : 'toCart'}`,
            )}
            icon={
              <Icon>
                {isInFavourites ? <HeartFilledIcon /> : <HeartIcon />}
              </Icon>
            }
          />
        </div>
      </div>
    </Link>
  );
});
