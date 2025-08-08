import React, { useContext } from 'react';
import { Product } from '../../../../types/ProductType';
import { Icon } from '../../../shared/components/Icon';
import { IconEnum } from '../../../../types/iconsType';
import cartItemClass from './cartItem.module.scss';
import cn from 'classnames';
import { CartContext } from '../../../../context/CartContext';
import { useNavigateToProduct } from '../../../../hooks/useNavigateToProducts';
import { IconButton } from '../../../shared/components/IconButton';

interface Props {
  product: Product;
}

export const CartItem: React.FC<Props> = React.memo(({ product }) => {
  const { id, name, image, price, totalCount } = product;
  const { increaseProductCount, decreaseProductCount, deleteProduct } =
    useContext(CartContext);
  const redirect = useNavigateToProduct();
  const handleClick = () => redirect(product);

  return (
    <div className={cn(cartItemClass['cart-item'])} onClick={handleClick}>
      <div className={cn(cartItemClass['cart-item__content'])}>
        <div className={cn(cartItemClass['cart-item__top'])}>
          <div
            className={cn(cartItemClass['cart-item__icon-wrapper'])}
            onClick={e => e.stopPropagation()}
          >
            <Icon
              iconName={IconEnum.delete}
              onActive={() => deleteProduct(id)}
            />
          </div>
          <img
            src={image}
            alt={name}
            className={cn(cartItemClass['cart-item__img'])}
          />
          <h2 className={cn(cartItemClass['cart-item__name'])}>{name}</h2>
        </div>
        <div className={cn(cartItemClass['cart-item__bottom'])}>
          <div
            className={cn(cartItemClass['cart-item__icons'])}
            onClick={e => e.stopPropagation()}
          >
            {/* <div
              onClick={() => decreaseProductCount(id)}
              className={cn(cartItemClass['cart-item__icon-wrapper'], {
                [cartItemClass['cart-item__icon-wrapper--disabled']]:
                  totalCount === 1,
              })}
            >
              <div
                className={cn(
                  cartItemClass['cart-item__icon'],
                  cartItemClass['cart-item__icon--minus'],
                  {
                    [cartItemClass['cart-item__icon--disabled']]:
                      totalCount === 1,
                  },
                )}
              ></div>

            </div> */}
            <div
              className={cn(cartItemClass['cart-item__icon-wrapper'])}
              onClick={() => decreaseProductCount(id)}
            >
              <IconButton
                iconName={IconEnum.minus}
                isDisabled={totalCount === 1}
              />
            </div>
            <p className={cn(cartItemClass['cart-item__count'])}>
              {totalCount || 1}
            </p>
            {/* <div className={cn(cartItemClass['cart-item__icon-wrapper'])}>
              <div
                onClick={() => increaseProductCount(id)}
                className={cn(
                  cartItemClass['cart-item__icon'],
                  cartItemClass['cart-item__icon--plus'],
                )}
              ></div>
            </div> */}
            <div
              className={cn(cartItemClass['cart-item__icon-wrapper'])}
              onClick={() => increaseProductCount(id)}
            >
              <IconButton iconName={IconEnum.plus} />
            </div>
          </div>
          <p className={cn(cartItemClass['cart-item__price'])}>
            ${price * (totalCount || 1)}
          </p>
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';
