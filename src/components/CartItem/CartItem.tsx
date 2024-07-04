import React, { useContext, useEffect, useState } from 'react';
import './CartItem.scss';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { ItemsContext } from '../../ItemsContext';

type Props = {
  product: Product;
  quantity: number;
  id: number;
  onDelete: (product: Product) => void;
  darkTheme: boolean;
};

export const CartItem: React.FC<Props> = ({
  product,
  quantity,
  id,
  onDelete,
  darkTheme,
}) => {
  const { name, image, price } = product;

  const { setAllPrices, setItems } = useContext(ItemsContext);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (quantity > 1) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [price, quantity]);

  const handleDecreaseProductQuantity = () => {
    setItems(currentItems => {
      const index = currentItems.findIndex(
        currentItem => currentItem.id === id,
      );

      const copyItems = [...currentItems];

      copyItems[index].quantity = quantity - 1;

      return copyItems;
    });

    setAllPrices(currentPrices => {
      const copyPrices = [...currentPrices];

      const index = copyPrices.findIndex(priceItem => priceItem.id === id);

      if (copyPrices[index]) {
        copyPrices[index].sum = (quantity - 1) * price;
      }

      return copyPrices;
    });
  };

  const handleIncreaseProductQuantity = () => {
    setItems(currentItems => {
      const index = currentItems.findIndex(
        currentItem => currentItem.id === id,
      );

      const copyItems = [...currentItems];

      copyItems[index].quantity = quantity + 1;

      return copyItems;
    });

    setAllPrices(currentPrices => {
      const copyPrices = [...currentPrices];

      const index = copyPrices.findIndex(priceItem => priceItem.id === id);

      if (copyPrices[index]) {
        copyPrices[index].sum = (quantity + 1) * price;
      }

      return copyPrices;
    });
  };

  return (
    <div className="cart-item">
      <div className="cart-item__top">
        <button
          className="cart-item__close icon-close"
          onClick={() => onDelete(product)}
        ></button>
        <div className="cart-item__image">
          <img src={image} alt="Product image" />
        </div>
        <p className="cart-item__name">{name}</p>
      </div>
      <div className="cart-item__bottom">
        <div className="cart-item__quantity-box">
          <button
            className={cn('button icon-minus', {
              'button--disabled': quantity === 1,
              'button--dark-theme': darkTheme,
              'button--dark-theme-disabled': quantity === 1 && darkTheme,
            })}
            disabled={isButtonDisabled}
            onClick={handleDecreaseProductQuantity}
          ></button>
          <p className="cart-item__quantity">{quantity}</p>
          <button
            className={cn('button icon-plus', {
              'button--dark-theme': darkTheme,
            })}
            onClick={handleIncreaseProductQuantity}
          ></button>
        </div>

        <p className="cart-item__price">{`$${price * quantity}`}</p>
      </div>
    </div>
  );
};
