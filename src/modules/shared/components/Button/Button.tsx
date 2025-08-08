import React, { useContext } from 'react';
import buttonClass from './button.module.scss';
import cn from 'classnames';
import { IconEnum } from '../../../../types/iconsType';
import { NavVariants } from '../../../../types/NavVariants';
import { FavoritesContext } from '../../../../context/FavoritesContext';
import { Product } from '../../../../types/ProductType';
import { CartContext } from '../../../../context/CartContext';
import { IconButton } from '../IconButton';

interface Prop {
  text?: string;
  variant?: NavVariants;
  isIcon?: boolean;
  product?: Product;
}

export const Button: React.FC<Prop> = React.memo(
  ({
    text = 'Add to cart',
    variant = NavVariants.button,
    isIcon = false,
    product,
  }) => {
    const { toggleFavorites, favProducts } = useContext(FavoritesContext);
    const { toggleCart, cartProducts } = useContext(CartContext);

    const isInCart = cartProducts.some(current => current.id === product?.id);
    const isInFavs = favProducts.some(current => current.id === product?.id);
    const textButton = isInCart ? 'Selected' : text;

    return (
      <div className={cn(buttonClass['button-container'])}>
        <div
          onClick={() => product && toggleCart(product)}
          className={cn(
            buttonClass['button-container__button'],
            buttonClass[`button-container__button--${variant}`],
            {
              [buttonClass['button-container__button--selected']]: isInCart,
            },
          )}
        >
          {textButton}
        </div>
        {isIcon && (
          <div
            className={cn(buttonClass['button-container__icon'])}
            onClick={() => product && toggleFavorites(product)}
          >
            <IconButton iconName={IconEnum.favorites} isActive={isInFavs} />
          </div>
        )}
      </div>
    );
  },
);

Button.displayName = 'Button';
