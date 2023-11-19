/* eslint-disable max-len */
import { useContext } from 'react';
import { baseUrl } from '../api/api';
import { typographyStyle } from '../CustomStyles/Typography';
import { ProductType } from '../Types/ProductType';
import { appContext } from '../Contexts/AppContext';

type Props = {
  product: ProductType;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { cartItems, setCartItems } = useContext(appContext);

  const getItemsQuantity = () => {
    return cartItems.find(item => item.product.itemId === product.itemId)
      ?.quantity;
  };

  const addToCart = () => {
    const cartItemIndex = cartItems.findIndex(
      item => item.product.itemId === product.itemId,
    );

    if (cartItemIndex >= 0) {
      const newItems = [...cartItems];

      newItems[cartItemIndex].quantity += 1;
      setCartItems([...newItems]);
    }
  };

  const removeOneFromCart = () => {
    const cartItemIndex = cartItems.findIndex(
      item => item.product.itemId === product.itemId,
    );

    if (cartItemIndex >= 0) {
      const newItems = [...cartItems];

      newItems[cartItemIndex].quantity -= 1;

      if (newItems[cartItemIndex].quantity < 1) {
        setCartItems([
          ...newItems.filter(item => item.product.itemId !== product.itemId),
        ]);

        return;
      }

      setCartItems([...newItems]);
    }
  };

  return (
    <div className="flex h-[128px] w-[752px] items-center border border-Elements">
      <button className="mx-6" type="button">
        <img src="./Icons/Close.svg" alt="" />
      </button>

      <div className="flex h-20 w-20 items-center justify-center">
        <img
          className="h-16 w-16 object-contain"
          src={`${baseUrl}/_new/${product.image}`}
          alt=""
        />
      </div>

      <div className="flex min-h-[42px] grow">
        <p>{product.name}</p>
      </div>

      <div className="flex">
        <button
          className="flex h-8 w-8 items-center justify-center border border-Elements"
          type="button"
          onClick={addToCart}
        >
          <img src="./Icons/Plus.svg" alt="" />
        </button>

        <div className="flex h-8 w-8 items-center justify-center">
          <p>{getItemsQuantity()}</p>
        </div>

        <button
          className="flex h-8 w-8 items-center justify-center border border-Elements"
          type="button"
          onClick={removeOneFromCart}
        >
          <img src="./Icons/Minus.svg" alt="" />
        </button>
      </div>

      <p className={`w-40 px-[42px] ${typographyStyle.h2}`}>
        $
        {product.price}
      </p>
    </div>
  );
};
