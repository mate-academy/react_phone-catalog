/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/display-name */
import { memo, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../model/types/product';
import { TechSpecs } from '../../../../shared/ui/TechSpecs';
import { RoutePaths } from '../../../../shared/config/routeConfig';
import { Button, ButtonSize, ButtonTheme } from '../../../../shared/ui/forms';
import icons from '../../../../shared/styles/icons.module.scss';
import cls from './productCard.module.scss';

interface Props {
  product: Product;
  toggleCart: (itemId: string) => void;
  toggleFavorite: (itemId: string) => void;
}

export const ProductCard = memo(
  ({ product, toggleCart, toggleFavorite }: Props) => {
    const {
      name,
      image,
      fullPrice,
      price,
      screen,
      capacity,
      ram,
      category,
      itemId,
      favorite,
      cartItem,
    } = product;
    const techSpecs = { screen, capacity, ram };
    const [favoriteItem, setFavoriteItem] = useState<boolean>(favorite);
    const [currentCartItem, setCurrentCartItem] = useState<number | false>(
      cartItem,
    );

    const toggleCartHandler = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentCartItem(prev => {
        if (typeof prev === 'number') {
          return false;
        } else {
          return 1;
        }
      });
      toggleCart?.(itemId);
    };

    const toggleFavoriteHandler = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setFavoriteItem(prev => !prev);
      toggleFavorite?.(itemId);
    };

    return (
      <Link
        to={`${RoutePaths.product_detail}${category}/${itemId}`}
        state={{ fromLocation: location.pathname }}
        className={cls.productCard}
      >
        <div className={cls.productCard__image}>
          <img src={`${image}`} alt={name} />
        </div>

        <div className={cls.productCard__content}>
          <p className={cls.productCard__name}>{name}</p>

          <div className={cls.productCard__price}>
            <span
              className={cls['productCard__current-price']}
            >{`$${price}`}</span>
            {fullPrice && (
              <span className={cls['productCard__absolute-price']}>
                {`$${fullPrice}`}
              </span>
            )}
          </div>

          <TechSpecs
            techSpecs={techSpecs}
            className={cls.productCard__characteristics}
          />

          <div className={cls.productCard__buttons}>
            <Button selected={!!currentCartItem} onClick={toggleCartHandler}>
              {currentCartItem ? 'Added to cart' : 'Add to cart'}
            </Button>
            <Button
              className={classNames({
                [icons['_icon-heart']]: !favoriteItem,
                [icons['_icon-heart_like']]: favoriteItem,
              })}
              theme={ButtonTheme.SQUARE_FAV}
              size={ButtonSize.M}
              onClick={toggleFavoriteHandler}
              selected={favoriteItem}
            />
          </div>
        </div>
      </Link>
    );
  },
);
